import styles from "./styles.module.scss";
import React from "react";

import Button from "../../components/Buttons";
import ConnerNotification from "../../components/ConnerNoti";

function saveImgConvert(initText, referBlock) {
    if (!initText) {
        return `Enter some data`;
    }

    // console.log(referBlock);

    const excels = initText.split(`\t1e0fLiN3tMntLt\n`);

    let data = ``;

    let l = excels.length;
    for (let i = 0; i < l; i++) {
        const excelRow = excels[i].split(`\t`);
        if (!excelRow[0] & (excelRow.length === 1)) break;

        let getUrlsFromE = [];

        excelRow.forEach((cell) => {
            if (
                /^https:\/\/.*(jpg|jpeg|png|webp|gif|avif|svg|dl=0|dl=1)/i.test(
                    cell,
                )
            ) {
                const newUrl = cell.replace("dl=0", "dl=1");
                getUrlsFromE.push(`"${newUrl}"`);
            }
        });

        // console.log(excelRow);

        data += `${i === 0 ? "" : ","} [PSCustomObject]@{
            UPC  = ${excelRow[1]} ;
            URLs = @(${getUrlsFromE.join(`,`)})
         } `;
    }
    data = ` $Data = @( ${data} )  ;`;

    return `${data}
        $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession;

        $headers = @{
        "User-Agent"      = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
        "Accept"          = "image/webp,image/apng,image/*,*/*;q=0.8";
        "Accept-Language" = "en-US,en;q=0.9";
        ${referBlock ? `"Referer" = "${referBlock}";` : ""}
        "Sec-Fetch-Site"  = "same-origin";
        "Sec-Fetch-Mode"  = "no-cors";
        "Sec-Fetch-Dest"  = "image";
        };
            
       

        $path = $PWD.Path;
        Write-Host "Downloading , Pls wait a moment ... <3";

        foreach ($item in $Data) {
            $index = 0;

            foreach ($url in $item.URLs) {
                Write-Host $url;

                $prefix = $item.UPC;

                if ($index -eq 0) {
                    $name = "$prefix-hero";
                }
                else {
                    $name = "$prefix-$index";
                };

                $cleanUrl = $url.Trim();
                $ext = [System.IO.Path]::GetExtension($cleanUrl).Split("?")[0];
                $file = "$path/$name$ext";

                try {
                    Invoke-WebRequest -Uri $cleanUrl -Headers $headers -WebSession $session -OutFile $file;
                    Write-Host "OK: $name";
                }
                catch {
                    Write-Host "FAIL: $cleanUrl";
                    Write-Host $_.Exception.Message;
                };

                $index++;
            };
        };

        Write-Host "ALL DONE!";
`;
}

function DownloadImg() {
    const [referUrl, setReferUrl] = React.useState();
    const [excel, setExcel] = React.useState();

    const constructors = [
        "1. Open your working file on PC",
        "2. Right click by mouse",
        "3. Open Terminal",
        "4. Paste converted text into the Terminal the Enter",
    ].map((item, index) => (
        <li key={index} className={styles.constructorItem}>
            {item}
        </li>
    ));

    return (
        <div className={styles.downloadImg}>
            <ul className={styles.constructorList}>
                {constructors}

                <li>
                    Remember : Add this
                    <Button
                        background="green"
                        size="medium"
                        shape="roundS"
                        selfCopy={true}
                        callbackOnClick={() => {
                            ConnerNotification(`COPIED`, `green`);
                        }}
                    >
                        1e0fLiN3tMntLt
                    </Button>
                    right after last column of excel before copy
                </li>
            </ul>

            <input
                onChange={(e) => {
                    setReferUrl(e.target.value);
                }}
                className={styles.blockUrl}
                type="text"
                placeholder="Paste website URL if they blocking auto download"
            />

            <Button
                classNames={styles.clearBtn}
                background="red"
                size="medium"
                shape="roundS"
                callbackOnClick={() => {
                    setExcel(``);
                }}
            >
                clear
            </Button>

            <textarea
                value={excel}
                className={styles.urlInput}
                onChange={(e) => {
                    setExcel(e.target.value);
                }}
            ></textarea>

            <div className={styles.converted}>
                {saveImgConvert(excel, referUrl)}
            </div>

            <Button
                size="medium"
                shape="roundS"
                callbackOnClick={() => {
                    ConnerNotification(`COPIED`, `green`);

                    navigator.clipboard.writeText(
                        saveImgConvert(excel, referUrl),
                    );
                }}
            >
                Copy
            </Button>
        </div>
    );
}

export default DownloadImg;
