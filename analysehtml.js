fs = require('fs');
const path = process.argv[2] == "alt" ? "./alt_output/output" : "./output/output"
function analyseHTML(outputNum) {
    return new Promise((resolve, reject) => {
    fs.readFile(path + outputNum + '.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            reject(err);
            return;
        }
        if (!data.includes("Prospects")) {
            reject('File does not contain valid HTML');
            return;
        }
        //console.log('File contents:', data);
        let jobTitle;
        if(data.includes('Find key facts and figures about working as an ')){
            jobTitle = data.slice(data.indexOf('<p class="mrgn-tp-lg mrgn-bttm-md">Find key facts and figures about working as an ', 200) + 82, data.indexOf('. The following information is applicable t'));
        } else {
            jobTitle = data.slice(data.indexOf('<p class="mrgn-tp-lg mrgn-bttm-md">Find key facts and figures about working as a ', 200) + 81, data.indexOf('. The following information is applicable t'));
        }
        let words = jobTitle.toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
        jobTitle = words.join(' ');
        const category = data.slice(data.indexOf('The following information is applicable to all ') + 47, data.indexOf('  (NOC'));
        let outlook;
        if(data.includes("<span class=\"outlooknote value object-nowrap\">")){
            const idk = data.indexOf("<span class=\"outlooknote value object-nowrap\">");
            outlook = data.slice(idk + 46, data.indexOf('</span>', idk+50));
        } else {
            const idk = data.indexOf("span class=\"outlook-graphic\">\n				</span>\n		</p>\n				<p class=\"section-value\">");
            outlook = data.slice(idk + 78, data.indexOf('</p>', idk+80));
        }
        let wage = parseFloat(data.slice(data.indexOf('<p class="section-value">$') + 26, data.indexOf('/hour')).replace(",",""));
        if (isNaN(wage)) {
            wage = 0;
        }

        //console.log('Category:', category);
        //console.log('Outlook for ' + category + ': ' + outlook);
        //console.log('Average Salary for ' + category + ': $' + salary + ' /year');
        resolve({jobTitle: jobTitle, category: category, outlook: outlook, wage: wage});
        //console.log(idk);
    });});
}
//analyseHTML(1).then(console.log);
module.exports = { analyseHTML };