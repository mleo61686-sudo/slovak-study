# Run from the Flunio repo (after confirming the publisher ID in AdSense).
# This updates/creates public/ads.txt without overwriting existing entries.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$public = Join-Path $root 'public'
$path = Join-Path $public 'ads.txt'
$publisherId = 'pub-1760161415033749' # from app/layout.tsx; confirm in AdSense before use
$entry = "google.com, $publisherId, DIRECT, f08c47fec0942fa0"
if (-not (Test-Path -LiteralPath $public)) { New-Item -Path $public -ItemType Directory | Out-Null }
if (Test-Path -LiteralPath $path) {
    $existing = Get-Content -LiteralPath $path -Raw -Encoding UTF8
} else {
    $existing = ''
}
if ($existing -match [regex]::Escape($publisherId)) {
    Write-Host "Publisher $publisherId already appears in public/ads.txt; review its line manually."
} else {
    $prefix = if ([string]::IsNullOrWhiteSpace($existing)) { '' } elseif ($existing.EndsWith("`n")) { '' } else { "`r`n" }
    [System.IO.File]::AppendAllText($path, "$prefix$entry`r`n", [System.Text.UTF8Encoding]::new($false))
    Write-Host "Added Google seller line to public/ads.txt."
}
Write-Host "Check: https://flunio.com/ads.txt after deployment."
