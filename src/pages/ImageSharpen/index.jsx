import React from "react";

function ImageResize() {
    const [width, setWidth] = React.useState("");
    const [height, setHeight] = React.useState("");

    // ===== xử lý =====
    const size = Number(width || height);
    const side = width ? "w" : "h";

    const isValid = size && !isNaN(size);

    const command = isValid
        ? `Add-Type -AssemblyName System.Drawing; Get-ChildItem -Path "." -Include *.jpg,*.jpeg,*.png -File -Recurse | ForEach-Object { $img=[System.Drawing.Image]::FromFile($_.FullName); $w=$img.Width; $h=$img.Height; if(("${side}" -eq "w" -and $w -gt ${size}) -or ("${side}" -eq "h" -and $h -gt ${size})){ if("${side}" -eq "w"){ $nw=${size}; $nh=[int]($h*(${size}/$w)) } else { $nh=${size}; $nw=[int]($w*(${size}/$h)) }; $bmp=New-Object System.Drawing.Bitmap $nw,$nh; $g=[System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode="HighQualityBicubic"; $g.DrawImage($img,0,0,$nw,$nh); $out=$_.FullName; $format=$img.RawFormat; $g.Dispose(); $img.Dispose(); $bmp.Save($out,$format); $bmp.Dispose() } else { $img.Dispose() } }`
        : "";

    // ===== copy =====
    const handleCopy = () => {
        if (!command) return;
        navigator.clipboard.writeText(command);
        alert("Copied!");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Resize Image (PowerShell)</h2>

            {/* WIDTH */}
            <p>Width</p>
            <input
                type="number"
                value={width}
                onChange={(e) => {
                    setWidth(e.target.value);
                    setHeight("");
                }}
            />

            {/* HEIGHT */}
            <p>Height</p>
            <input
                type="number"
                value={height}
                onChange={(e) => {
                    setHeight(e.target.value);
                    setWidth("");
                }}
            />

            {/* COMMAND */}
            <div
                style={{
                    marginTop: 20,
                    padding: 10,
                    background: "#111",
                    color: "#0f0",
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                }}
            >
                {command || "Enter or height..."}
            </div>

            {/* BUTTON */}
            <button
                onClick={handleCopy}
                disabled={!command}
                style={{ marginTop: 10 }}
            >
                Copy Command
            </button>
        </div>
    );
}

export default ImageResize;
