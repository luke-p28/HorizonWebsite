if "%1"== "alt" (
    powershell -command powershell -command {start-job {cd c:/users/luke0/projects/javascript/site; httpserver}; cd c:/users/luke0/projects/javascript; node server.js alt} 
) else (
    powershell -command powershell -command {start-job {cd c:/users/luke0/projects/javascript/site; httpserver}; cd c:/users/luke0/projects/javascript; node server.js} 
)