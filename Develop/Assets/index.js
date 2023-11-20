const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require('./generateMarkdown');
const questions = [

    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project',
    },
    {
      type: 'input',
      name: 'description', 
      message: 'Breifly describe your application',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Explain how to install the application'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How the application will be used'        
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license will you use for your project?',
        choices: ['mit', 'GPLv2', 'Apache', 'no license']
    },
    {
        type: 'confirm',
        name: 'confirmContributers',
        message: 'Will there be contributers to this application?',
        default: true
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'Please provide guidelines for contributing.',
        when: ({ confirmContributers }) => {
            if (confirmContributers) {
                return true;
            } else {
                message: 'No contrinutions';
            }
        },
        validate: contributerInput => {
            if (contributerInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'Provide instructions and examples of how the code is tested:',
    },

    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub Username? (Required)',
    }, 
    
];
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./newREADME/generated-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})

init();