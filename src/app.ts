import { DeveloperFactory } from '@medusa-issues/developer/developer.factory';
import { GithubApiClient } from '@medusa-issues/github/github.client';
import { OpenAIApiClient } from '@medusa-issues/open-ai/open-ai.client';
import { QuestionBuilder } from '@medusa-issues/open-ai/question/question.builder';
import { FileRespository } from '@medusa-issues/resources/file.repository';

async function main(): Promise<void> {
    const topics: string[] = [
        'api',
    ];
    const maxNumberOfIssues = 30;
    const numberOfIssuesPerDeveloper = 1;
    const medusaTeam =  DeveloperFactory.medusaTeam();

    const gitHubIssues = await GithubApiClient.getGitHubIssues(topics, maxNumberOfIssues);
    FileRespository.saveGithubIssues(gitHubIssues);

    const questionBuilder = new QuestionBuilder(medusaTeam, gitHubIssues, numberOfIssuesPerDeveloper);
    const question = questionBuilder.question;
    FileRespository.saveOpenAiInput(question);

    const resultFromOpenAi = await OpenAIApiClient.getResult(question);
    FileRespository.saveOpenAiOutput(resultFromOpenAi);
}

void main()
    .then(() => console.log(FileRespository.printOpenAiOutput()))
    .catch((error) => console.error(error));
