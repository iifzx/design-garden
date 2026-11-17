# design-garden avatar: a modular grid where one cell blooms.
# Two rows of craft, one accent bloom — the skill that grows. Drawn 4x and
# downsampled for crisp edges at 512; no text, no gradients, no AI tells.
Add-Type -AssemblyName System.Drawing

$S = 4
$BIG = 512 * $S
$out = Join-Path $PSScriptRoot "avatar.png"

$field  = [System.Drawing.ColorTranslator]::FromHtml("#0F4A3B")
$paper  = [System.Drawing.ColorTranslator]::FromHtml("#F4F0E4")
$accent = [System.Drawing.ColorTranslator]::FromHtml("#E4572E")

$bmp = New-Object System.Drawing.Bitmap($BIG, $BIG)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear($field)

function U([double]$v) { [double]($v * $S) }

function RoundedBlock([double]$x, [double]$y, [double]$w, [double]$h, [double]$r, $color) {
  $brush = New-Object System.Drawing.SolidBrush($color)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = 2 * $r
  $path.AddArc([single](U($x)), [single](U($y)), [single](U($d)), [single](U($d)), 180, 90)
  $path.AddArc([single](U($x + $w - $d)), [single](U($y)), [single](U($d)), [single](U($d)), 270, 90)
  $path.AddArc([single](U($x + $w - $d)), [single](U($y + $h - $d)), [single](U($d)), [single](U($d)), 0, 90)
  $path.AddArc([single](U($x)), [single](U($y + $h - $d)), [single](U($d)), [single](U($d)), 90, 90)
  $g.FillPath($brush, $path)
  $path.Dispose(); $brush.Dispose()
}

# grid: cell 126, gutter 20 → 272 wide, centred on 256; two rows
$cell = 126
$gap = 20
$left = (512 - ($cell * 2 + $gap)) / 2      # 120
$top = (512 - ($cell * 2 + $gap)) / 2       # 120
$r = 10

# top-left block (craft)
RoundedBlock $left $top $cell $cell $r $paper
# bottom-left block (craft), tightened to one row of material
RoundedBlock $left ($top + $cell + $gap) $cell $cell $r $paper
# bottom-right block, short — the row that has not grown yet
RoundedBlock ($left + $cell + $gap) ($top + $cell + $gap) $cell $cell $r $paper

# top-right cell blooms: the single accent, optically a touch larger than the blocks
$cx = $left + $cell + $gap + $cell / 2
$cy = $top + $cell / 2
$rr = 50
$g.FillEllipse((New-Object System.Drawing.SolidBrush($accent)),
    [single](U($cx - $rr)), [single](U($cy - $rr)), [single](U($rr * 2)), [single](U($rr * 2)))

# --- downsample ---
$small = New-Object System.Drawing.Bitmap(512, 512)
$sg = [System.Drawing.Graphics]::FromImage($small)
$sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$sg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$sg.DrawImage($bmp, 0, 0, 512, 512)
$sg.Dispose(); $g.Dispose()

$small.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$small.Dispose(); $bmp.Dispose()

"$out · $([math]::Round((Get-Item -LiteralPath $out).Length / 1KB, 1)) KB"
