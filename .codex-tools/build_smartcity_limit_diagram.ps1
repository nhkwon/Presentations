param(
  [Parameter(Mandatory = $true)][string]$Output
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

function U {
  param([string]$B64)
  return [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($B64))
}

function Draw-RoundRect {
  param(
    [System.Drawing.Graphics]$G,
    [System.Drawing.RectangleF]$Rect,
    [float]$Radius,
    [System.Drawing.Brush]$Brush,
    [System.Drawing.Pen]$Pen
  )
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $Radius * 2
  $path.AddArc($Rect.X, $Rect.Y, $d, $d, 180, 90)
  $path.AddArc($Rect.Right - $d, $Rect.Y, $d, $d, 270, 90)
  $path.AddArc($Rect.Right - $d, $Rect.Bottom - $d, $d, $d, 0, 90)
  $path.AddArc($Rect.X, $Rect.Bottom - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  if ($Brush) { $G.FillPath($Brush, $path) }
  if ($Pen) { $G.DrawPath($Pen, $path) }
  $path.Dispose()
}

function Draw-CenteredText {
  param(
    [System.Drawing.Graphics]$G,
    [string]$Text,
    [System.Drawing.Font]$Font,
    [System.Drawing.Brush]$Brush,
    [System.Drawing.RectangleF]$Rect
  )
  $sf = [System.Drawing.StringFormat]::new()
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $sf.FormatFlags = [System.Drawing.StringFormatFlags]::LineLimit
  $G.DrawString($Text, $Font, $Brush, $Rect, $sf)
  $sf.Dispose()
}

function Draw-Arrow {
  param(
    [System.Drawing.Graphics]$G,
    [float]$X1,
    [float]$Y1,
    [float]$X2,
    [float]$Y2,
    [System.Drawing.Pen]$Pen
  )
  $G.DrawLine($Pen, $X1, $Y1, $X2, $Y2)
  $angle = [Math]::Atan2(($Y2 - $Y1), ($X2 - $X1))
  $len = 20
  $a1 = $angle + [Math]::PI * 0.82
  $a2 = $angle - [Math]::PI * 0.82
  $p1 = [System.Drawing.PointF]::new($X2, $Y2)
  $p2 = [System.Drawing.PointF]::new(($X2 + [Math]::Cos($a1) * $len), ($Y2 + [Math]::Sin($a1) * $len))
  $p3 = [System.Drawing.PointF]::new(($X2 + [Math]::Cos($a2) * $len), ($Y2 + [Math]::Sin($a2) * $len))
  $G.FillPolygon([System.Drawing.SolidBrush]::new($Pen.Color), @($p1, $p2, $p3))
}

$W = 1800
$H = 1012
$bmp = [System.Drawing.Bitmap]::new($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::White)

$fontTitle = [System.Drawing.Font]::new('Malgun Gothic', 34, [System.Drawing.FontStyle]::Bold)
$fontHead = [System.Drawing.Font]::new('Malgun Gothic', 25, [System.Drawing.FontStyle]::Bold)
$fontBody = [System.Drawing.Font]::new('Malgun Gothic', 20, [System.Drawing.FontStyle]::Bold)
$fontSmall = [System.Drawing.Font]::new('Malgun Gothic', 17, [System.Drawing.FontStyle]::Regular)

$navy = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(18, 42, 76))
$blue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(29, 112, 184))
$teal = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(31, 139, 135))
$green = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(78, 147, 87))
$text = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(32, 43, 58))
$white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$lightBlue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(237, 245, 251))
$lightTeal = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(232, 247, 245))
$lightGreen = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(236, 248, 239))
$lineBlue = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(29, 112, 184), 4)
$lineGray = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(190, 202, 214), 2)

$title = U '7Iqk66eI7Yq46rG07ISk6rSA66asIOq4sOyIoOydmCDtlZzqs4TsmYAg6rCc7ISgwrfrsJzsoITrsKntlqU='
$g.DrawString($title, $fontTitle, $navy, 80, 54)
$g.DrawLine($lineBlue, 80, 118, 1720, 118)

$heads = @(
  '7ZiE7J6sIO2VnOqzhA==',
  '6rCc7ISgIOyghOuetQ==',
  '67Cc7KCE67Cp7Zal'
) | ForEach-Object { U $_ }
$headBrushes = @($blue, $teal, $green)
$bodyBrushes = @($lightBlue, $lightTeal, $lightGreen)
$xs = @(92, 654, 1216)
$colW = 492
$headY = 170
$headH = 70
$boxY = 285
$boxH = 74
$gap = 22

for ($c = 0; $c -lt 3; $c++) {
  $rect = [System.Drawing.RectangleF]::new($xs[$c], $headY, $colW, $headH)
  Draw-RoundRect $g $rect 18 $headBrushes[$c] $null
  Draw-CenteredText $g $heads[$c] $fontHead $white $rect
}

$limitations = @(
  '67aE7KCI65CcIOq4sOyIoCDsoIHsmqk=',
  '7ZiE7J6lIOuNsOydtO2EsOyZgCDsnZjsgqzqsrDsoJUg64uo7KCI',
  '7J6l67mEwrfshLzshJzCt+2UjOueq+2PvCDtkZzspIAg67aA7KGx',
  'R1BTwrfthrXsi6Ag7J2M7JiB7KeA7Jet',
  '6rOg6rCAIOyepeu5hCDrsI8g7KCE66y46rCAIOydmOyhtA=='
) | ForEach-Object { U $_ }
$strategies = @(
  'QklNLURpZ2l0YWwgVHdpbi1BSSDquLDrsJgg7Ya17ZWpIO2UjOueq+2PvA==',
  '642w7J207YSwIOyImOynkS3rtoTshJ0t7JiI7LihLeuMgOydkQ==',
  '6rCc67Cp7ZiVIO2RnOykgCwgQVBJLCDqs7XthrUg642w7J207YSw66qo6424',
  '7ZiE7J6lIOuEpO2KuOybjO2BrC/snITsuZjstpTsoIEg6rOg64+E7ZmU',
  '7KCA67mE7JqpIOyEvOyEnCDrsI8g7J6Q64+Z7ZmUIOyatOyYgQ=='
) | ForEach-Object { U $_ }
$directions = @(
  '7JiI7Lih7ZiVIOqzteyglcK37ZKI7KeIwrfslYjsoITqtIDrpqw=',
  '64+E7IucIOyduO2UhOudvCDsg53slaDso7zquLAg7J6Q7IKw6rSA66as',
  '7Iuc66+8IOyViOyghCDrsI8g7YOE7IaMwrftmozrs7Xtg4TroKXshLE=',
  '7Jew6rWswrfqtZDsnKHCt+yCsO2Vme2YkeugpSDtlIzrnqvtj7w='
) | ForEach-Object { U $_ }
$columns = @($limitations, $strategies, $directions)

for ($c = 0; $c -lt 3; $c++) {
  for ($i = 0; $i -lt $columns[$c].Count; $i++) {
    $y = $boxY + ($i * ($boxH + $gap))
    $rect = [System.Drawing.RectangleF]::new($xs[$c], $y, $colW, $boxH)
    Draw-RoundRect $g $rect 14 $bodyBrushes[$c] $lineGray
    Draw-CenteredText $g $columns[$c][$i] $fontSmall $text $rect
  }
}

Draw-Arrow $g 590 508 642 508 $lineBlue
Draw-Arrow $g 1152 508 1204 508 $lineBlue

$bottom = [System.Drawing.RectangleF]::new(250, 860, 1300, 78)
Draw-RoundRect $g $bottom 18 $navy $null
Draw-CenteredText $g 'From Technology Adoption to Integrated Smart Construction Management' $fontBody $white $bottom

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, 95L)
$bmp.Save($Output, $codec, $encParams)

$encParams.Dispose()
$g.Dispose()
$bmp.Dispose()
$fontTitle.Dispose()
$fontHead.Dispose()
$fontBody.Dispose()
$fontSmall.Dispose()
$navy.Dispose()
$blue.Dispose()
$teal.Dispose()
$green.Dispose()
$text.Dispose()
$white.Dispose()
$lightBlue.Dispose()
$lightTeal.Dispose()
$lightGreen.Dispose()
$lineBlue.Dispose()
$lineGray.Dispose()
