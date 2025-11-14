FOR /F "usebackq tokens=* delims=" %%A IN (`powershell -command Get-Location`) DO (
    SET "data=%%A"
)
if "%1"== "alt" (
    powershell -command powershell -command {start-job -scriptblock {echo $input; cd $input; httpserver} -inputobject %data%/site; receive-job 1; node server.js alt}
) else (
    powershell -command powershell -command {start-job -scriptblock {echo $input; cd $input; httpserver} -inputobject %data%/site; receive-job 1; node server.js}
)