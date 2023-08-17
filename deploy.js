const fetch = require('node-fetch');
const simpleGit = require('simple-git');
const { exec } = require('child_process');

const repoPath = '/home/qrder-nodejs';
const nginxRestartCommand = 'docker restart f0854c7e9223 && docker restart cfdd26d5ea4c';

const username = 'VoronVoronov';
const password = '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';
const repository = 'VoronVoronov/qrder-nodejs'; // Например, "username/repository"

const git = simpleGit(repoPath);

async function fetchCommits() {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
        const commitsResponse = await fetch(`https://api.github.com/repos/${repository}/commits`, {
            headers: {
                Authorization: authHeader
            }
        });

        if (!commitsResponse.ok) {
            throw new Error(`Ошибка получения коммитов: ${commitsResponse.status} ${commitsResponse.statusText}`);
        }

        const commits = await commitsResponse.json();
        return commits.map(commit => commit.sha);
    } catch (error) {
        console.error('Произошла ошибка при получении коммитов:', error.message);
        return [];
    }
}

async function deploy() {
    const commitShas = await fetchCommits();
    if (commitShas.length === 0) {
        console.log('Нет новых коммитов для обновления.');
        return;
    }

    try {
        console.log('Получение обновлений из репозитория...');
        await git.pull();

        console.log('Обновления успешно получены.');

        console.log('Перезапуск Nginx...');
        await executeCommand(nginxRestartCommand);

        console.log('Nginx успешно перезапущен.');
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout || stderr);
        });
    });
}

deploy();
