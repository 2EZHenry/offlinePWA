$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$targetRoot = Join-Path $scriptDir "app\src\main\assets\www"

$pathsToCopy = @(
	"index.html",
	"offline.html",
	"styles.css",
	"app.js",
	"service-worker.js",
	"manifest.json",
	"favicon.ico",
	"icon-192x192.png",
	"icon-512x512.png",
	"apple-touch-icon.png",
	"images"
)

if (Test-Path $targetRoot) {
	Remove-Item -LiteralPath $targetRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $targetRoot | Out-Null

foreach ($relativePath in $pathsToCopy) {
	$sourcePath = Join-Path $projectRoot $relativePath
	$destinationPath = Join-Path $targetRoot $relativePath

	if (-not (Test-Path $sourcePath)) {
		Write-Warning "Skipping missing path: $relativePath"
		continue
	}

	Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Recurse -Force
}

Write-Host "Web assets synced to $targetRoot"
