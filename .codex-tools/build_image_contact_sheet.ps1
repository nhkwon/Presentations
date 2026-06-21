param(
  [Parameter(Mandatory = $true)][string]$ImageDir,
  [Parameter(Mandatory = $true)][string]$Output,
  [int]$Count = 60
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$manifest = Get-Content -LiteralPath (Join-Path $ImageDir 'manifest.json') -Encoding UTF8 | ConvertFrom-Json
$items = $manifest | Sort-Object @{ Expression = { $_.width * $_.height }; Descending = $true } | Select-Object -First $Count

$thumbW = 240
$thumbH = 170
$labelH = 38
$pad = 18
$cols = 4
$rows = [Math]::Ceiling($items.Count / $cols)
$width = ($cols * $thumbW) + (($cols + 1) * $pad)
$height = ($rows * ($thumbH + $labelH)) + (($rows + 1) * $pad)

$bmp = [System.Drawing.Bitmap]::new($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$font = [System.Drawing.Font]::new('Arial', 10, [System.Drawing.FontStyle]::Regular)
$brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(30, 35, 45))
$pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(210, 215, 222), 1)

for ($i = 0; $i -lt $items.Count; $i++) {
  $item = $items[$i]
  $col = $i % $cols
  $row = [Math]::Floor($i / $cols)
  $x = $pad + ($col * ($thumbW + $pad))
  $y = $pad + ($row * ($thumbH + $labelH + $pad))
  $imgPath = Join-Path $ImageDir $item.name
  $img = [System.Drawing.Image]::FromFile($imgPath)
  $scale = [Math]::Min($thumbW / $img.Width, $thumbH / $img.Height)
  $drawW = [Math]::Round($img.Width * $scale)
  $drawH = [Math]::Round($img.Height * $scale)
  $dx = $x + [Math]::Round(($thumbW - $drawW) / 2)
  $dy = $y + [Math]::Round(($thumbH - $drawH) / 2)
  $g.DrawRectangle($pen, $x, $y, $thumbW, $thumbH)
  $g.DrawImage($img, $dx, $dy, $drawW, $drawH)
  $label = "{0}. {1} ({2}x{3})" -f ($i + 1), $item.name, $item.width, $item.height
  $g.DrawString($label, $font, $brush, $x, $y + $thumbH + 6)
  $img.Dispose()
}

$bmp.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$font.Dispose()
$brush.Dispose()
$pen.Dispose()
