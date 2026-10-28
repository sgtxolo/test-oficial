# OCR de Windows (es-ES) de una carpeta de PNG -> un JSON por imagen con las palabras y sus cajas (píxeles).
# Uso: powershell -File ocr-windows.ps1 <carpeta con pNN.png>   (escribe pNN.json al lado)
param([string]$Dir)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrResult, Windows.Foundation, ContentType = WindowsRuntime]
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Await($op, [Type]$Ty) { $task = $asTask.MakeGenericMethod($Ty).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
foreach ($f in Get-ChildItem -Path $Dir -Filter *.png) {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
  $out = @()
  foreach ($l in $res.Lines) { foreach ($w in $l.Words) { $r = $w.BoundingRect; $out += , @($w.Text, [math]::Round($r.X, 1), [math]::Round($r.Y, 1), [math]::Round($r.Width, 1), [math]::Round($r.Height, 1)) } }
  $json = ConvertTo-Json -InputObject $out -Compress -Depth 4
  [System.IO.File]::WriteAllText(($f.FullName -replace '\.png$', '.json'), $json, [System.Text.Encoding]::UTF8)
  Write-Output ("{0}: {1} palabras" -f $f.Name, $out.Count)
}
