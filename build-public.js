const fs = require('fs');
const path = require('path');

const root = __dirname;
const output = path.join(root, 'dist');
const sourceFiles = ['index.html', 'script.js', 'style.css'];
const privateSections = {
    'index.html': [
        [
            '<!-- PUBLIC_DEPLOYMENT_REMOVE_CONTACT_BUTTONS_START -->',
            '<!-- PUBLIC_DEPLOYMENT_REMOVE_CONTACT_BUTTONS_END -->'
        ],
        [
            '<!-- PUBLIC_DEPLOYMENT_REMOVE_CONTACT_CONFIG_START -->',
            '<!-- PUBLIC_DEPLOYMENT_REMOVE_CONTACT_CONFIG_END -->'
        ]
    ],
    'script.js': [
        [
            '// PUBLIC_DEPLOYMENT_REMOVE_CONTACT_REFERENCES_START',
            '// PUBLIC_DEPLOYMENT_REMOVE_CONTACT_REFERENCES_END'
        ],
        [
            '// PUBLIC_DEPLOYMENT_REMOVE_CONTACT_HANDLERS_START',
            '// PUBLIC_DEPLOYMENT_REMOVE_CONTACT_HANDLERS_END'
        ]
    ]
};

function removeSection(content, startMarker, endMarker, fileName) {
    const start = content.indexOf(startMarker);
    const end = content.indexOf(endMarker);
    if (start < 0 || end < start ||
        content.indexOf(startMarker, start + startMarker.length) >= 0 ||
        content.indexOf(endMarker, end + endMarker.length) >= 0) {
        throw new Error('Repères de version publique invalides dans ' + fileName);
    }

    const endOfLine = content.indexOf('\n', end + endMarker.length);
    const afterSection = endOfLine < 0 ? content.length : endOfLine + 1;
    return content.slice(0, start) + content.slice(afterSection);
}

fs.mkdirSync(output, { recursive: true });

sourceFiles.forEach(fileName => {
    let content = fs.readFileSync(path.join(root, fileName), 'utf8');
    (privateSections[fileName] || []).forEach(([start, end]) => {
        content = removeSection(content, start, end, fileName);
    });
    fs.writeFileSync(path.join(output, fileName), content, 'utf8');
});
