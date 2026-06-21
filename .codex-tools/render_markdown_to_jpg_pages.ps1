param(
  [Parameter(Mandatory = $true)][string]$InputMd,
  [Parameter(Mandatory = $true)][string]$OutDir
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$pageWidth = 1240
$pageHeight = 1754
$marginX = 76
$marginTop = 70
$marginBottom = 78
$contentWidth = $pageWidth - ($marginX * 2)

if (Test-Path -LiteralPath $OutDir) {
  Get-ChildItem -LiteralPath $OutDir -Filter '*.jpg' | Remove-Item -Force
} else {
  New-Item -ItemType Directory -Path $OutDir | Out-Null
}

$fontFamily = 'Malgun Gothic'
$fontH1 = [System.Drawing.Font]::new($fontFamily, 26, [System.Drawing.FontStyle]::Bold)
$fontH2 = [System.Drawing.Font]::new($fontFamily, 20, [System.Drawing.FontStyle]::Bold)
$fontH3 = [System.Drawing.Font]::new($fontFamily, 16, [System.Drawing.FontStyle]::Bold)
$fontBody = [System.Drawing.Font]::new($fontFamily, 13, [System.Drawing.FontStyle]::Regular)
$fontBodyBold = [System.Drawing.Font]::new($fontFamily, 13, [System.Drawing.FontStyle]::Bold)
$fontSmall = [System.Drawing.Font]::new($fontFamily, 11, [System.Drawing.FontStyle]::Regular)

$brushTitle = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(18, 60, 105))
$brushText = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(23, 32, 51))
$brushMuted = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(73, 86, 105))
$brushBlue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(15, 66, 110))
$brushLight = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(241, 247, 252))
$penBlue = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(29, 112, 184), 3)
$penLight = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(204, 219, 232), 1)

$script:pageNo = 0
$script:bitmap = $null
$script:g = $null
$script:y = $marginTop

function Save-Page {
  if ($null -eq $script:bitmap) { return }
  $script:g.DrawLine($penLight, $marginX, $pageHeight - 54, $pageWidth - $marginX, $pageHeight - 54)
  $footer = "SeoulTech Smart City 10p PPT Draft | page $($script:pageNo)"
  $script:g.DrawString($footer, $fontSmall, $brushMuted, $marginX, $pageHeight - 44)
  $file = Join-Path $OutDir ('page{0:D3}.jpg' -f $script:pageNo)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $encParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $encParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, 94L)
  $script:bitmap.Save($file, $codec, $encParams)
  $encParams.Dispose()
  $script:g.Dispose()
  $script:bitmap.Dispose()
}

function New-Page {
  Save-Page
  $script:pageNo += 1
  $script:bitmap = [System.Drawing.Bitmap]::new($pageWidth, $pageHeight)
  $script:g = [System.Drawing.Graphics]::FromImage($script:bitmap)
  $script:g.Clear([System.Drawing.Color]::White)
  $script:g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $script:g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $script:y = $marginTop
}

function Strip-Markdown {
  param([string]$Text)
  return $Text.Replace('**', '').Replace('`', '')
}

function Wrap-Text {
  param(
    [string]$Text,
    [System.Drawing.Font]$Font,
    [int]$MaxWidth
  )
  $clean = Strip-Markdown $Text
  if ([string]::IsNullOrWhiteSpace($clean)) { return @('') }
  $lines = New-Object System.Collections.Generic.List[string]
  $current = ''
  foreach ($ch in $clean.ToCharArray()) {
    $candidate = $current + $ch
    $size = $script:g.MeasureString($candidate, $Font)
    if ($size.Width -gt $MaxWidth -and $current.Length -gt 0) {
      $lines.Add($current.TrimEnd())
      $current = [string]$ch
    } else {
      $current = $candidate
    }
  }
  if ($current.Trim().Length -gt 0) { $lines.Add($current.TrimEnd()) }
  return $lines.ToArray()
}

function Ensure-Space {
  param([int]$Needed)
  if (($script:y + $Needed) -gt ($pageHeight - $marginBottom)) {
    New-Page
  }
}

function Draw-Wrapped {
  param(
    [string]$Text,
    [System.Drawing.Font]$Font,
    [System.Drawing.Brush]$Brush,
    [int]$X,
    [int]$Width,
    [int]$LineHeight,
    [int]$After,
    [int]$Indent = 0
  )
  $lines = Wrap-Text -Text $Text -Font $Font -MaxWidth $Width
  foreach ($line in $lines) {
    Ensure-Space $LineHeight
    $script:g.DrawString($line, $Font, $Brush, $X + $Indent, $script:y)
    $script:y += $LineHeight
  }
  $script:y += $After
}

function Draw-Boxed {
  param(
    [string]$Text,
    [System.Drawing.Font]$Font,
    [System.Drawing.Brush]$Brush
  )
  $boxPad = 14
  $lines = Wrap-Text -Text $Text -Font $Font -MaxWidth ($contentWidth - ($boxPad * 2))
  $height = ($lines.Count * 24) + ($boxPad * 2)
  Ensure-Space ($height + 12)
  $rect = [System.Drawing.Rectangle]::new($marginX, $script:y, $contentWidth, $height)
  $script:g.FillRectangle($brushLight, $rect)
  $script:g.DrawLine($penBlue, $marginX, $script:y, $marginX, $script:y + $height)
  $textY = $script:y + $boxPad
  foreach ($line in $lines) {
    $script:g.DrawString($line, $Font, $Brush, $marginX + $boxPad, $textY)
    $textY += 24
  }
  $script:y += $height + 14
}

New-Page
$rawLines = Get-Content -LiteralPath $InputMd -Encoding UTF8
foreach ($raw in $rawLines) {
  $line = $raw.TrimEnd()
  if ([string]::IsNullOrWhiteSpace($line)) {
    $script:y += 6
    continue
  }

  if ($line.StartsWith('# ')) {
    Draw-Wrapped -Text $line.Substring(2) -Font $fontH1 -Brush $brushTitle -X $marginX -Width $contentWidth -LineHeight 42 -After 18
  } elseif ($line.StartsWith('## ')) {
    Ensure-Space 54
    $script:g.DrawLine($penBlue, $marginX, $script:y, $pageWidth - $marginX, $script:y)
    $script:y += 16
    Draw-Wrapped -Text $line.Substring(3) -Font $fontH2 -Brush $brushTitle -X $marginX -Width $contentWidth -LineHeight 32 -After 12
  } elseif ($line.StartsWith('### ')) {
    Ensure-Space 46
    Draw-Wrapped -Text $line.Substring(4) -Font $fontH3 -Brush $brushBlue -X $marginX -Width $contentWidth -LineHeight 27 -After 8
  } elseif ($line.StartsWith('> ')) {
    Draw-Boxed -Text $line.Substring(2) -Font $fontBodyBold -Brush $brushBlue
  } elseif ($line.StartsWith('- ')) {
    $bullet = ([char]0x2022) + ' ' + $line.Substring(2)
    Draw-Wrapped -Text $bullet -Font $fontBody -Brush $brushText -X ($marginX + 18) -Width ($contentWidth - 18) -LineHeight 23 -After 2
  } elseif ($line.StartsWith('**')) {
    Draw-Wrapped -Text $line -Font $fontBodyBold -Brush $brushText -X $marginX -Width $contentWidth -LineHeight 24 -After 4
  } else {
    Draw-Wrapped -Text $line -Font $fontBody -Brush $brushText -X $marginX -Width $contentWidth -LineHeight 23 -After 4
  }
}

Save-Page

$fontH1.Dispose()
$fontH2.Dispose()
$fontH3.Dispose()
$fontBody.Dispose()
$fontBodyBold.Dispose()
$fontSmall.Dispose()
$brushTitle.Dispose()
$brushText.Dispose()
$brushMuted.Dispose()
$brushBlue.Dispose()
$brushLight.Dispose()
$penBlue.Dispose()
$penLight.Dispose()
