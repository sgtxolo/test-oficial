# OCR con el motor de Windows (Windows.Media.Ocr, idioma del perfil: es-ES). Sin instalar nada.
# Uso: powershell -File ocr-windows.ps1 <carpeta con PNG> <salida.json>
#   Para cada <carpeta>\pNNN.png devuelve las palabras con su caja (píxeles): { "NNN": [ {t, x, y, w, h}, … ] }
param([string]$Carpeta, [string]$Salida)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, $tipo) { $t = $asTask.MakeGenericMethod($tipo).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }
$motor = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $motor) { throw 'Sin motor OCR' }
$res = [ordered]@{}
foreach ($f in (Get-ChildItem -Path $Carpeta -Filter 'p*.png' | Sort-Object Name)) {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $r = Await ($motor.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
  $pal = New-Object System.Collections.ArrayList
  foreach ($l in $r.Lines) { foreach ($w in $l.Words) { $b = $w.BoundingRect; [void]$pal.Add([ordered]@{ t = $w.Text; x = [math]::Round($b.X, 1); y = [math]::Round($b.Y, 1); w = [math]::Round($b.Width, 1); h = [math]::Round($b.Height, 1) }) } }
  $res[$f.BaseName.Substring(1)] = $pal
  $stream.Dispose()
  Write-Host $f.Name $pal.Count
}
($res | ConvertTo-Json -Depth 5 -Compress) | Set-Content -Path $Salida -Encoding UTF8
