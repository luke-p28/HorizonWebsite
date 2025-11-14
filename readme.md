# **Horizon Skills Academy Website**

## Job Bank Canada web scraper

### About the application:

Uses Puppeteer to collect data from the Job Bank Canada website, selecting up to 10 random jobs and determining the one with the best sector outlook (ties broken by salary). Uses httpserver and express to display the result on a website, along with a description of the imaginary Horizon Skills Academy.

### Instructions:

After downloading, run setup.bat to configure the project. To run the server, run the run.bat file. This will open the server on port 3000 (forwarding traffic to ports 8080 and 3001)\. To stop the process, use Ctrl+C. If prompted “Terminate batch job (Y/N)?”, either answer will work. To run the server with alternate, pre-saved data (stored in alt_outputs), use "./run.bat alt" instead.

### System requirements:

- Node.js  
- Powershell  
- Windows OS