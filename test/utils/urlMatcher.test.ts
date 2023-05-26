import { assert, expect, test } from 'vitest'
import {
    getGithubUsername,
    getLinkedInUsername,
    getTwitterUsername,
    isGithubProfilePage,
    isGithubPullRequestPage,
    isGithubRepoPage,
    isPullRequestCreatePage,
    isPullRequestFilesChangedPage,
    getPullRequestAPIURL,
} from '../../src/utils/urlMatchers'

test('getGithubUsername', () => {
    expect(getGithubUsername('https://www.github.com/')).toBe(undefined)
    expect(getGithubUsername('https://www.github.com/username')).toBe('username')
    expect(getGithubUsername('https://www.github.com/username/')).toBe('username')
    expect(getGithubUsername('https://www.github.com/username/repo')).toBe('username')
    expect(getGithubUsername('https://www.github.com/username/repo/')).toBe('username')
    expect(getGithubUsername('https://www.github.com/username/repo/pulls')).toBe('username')
    expect(getGithubUsername('www.github.com/123')).toBe('123')
    expect(getGithubUsername('github.com/123/')).toBe('123')
    expect(getGithubUsername('abcd')).toBe(undefined)
})

test('getLinkedInUsername', () => {
    expect(getLinkedInUsername('https://www.linkedin.com/in/')).toBe('')
    expect(getLinkedInUsername('https://www.linkedin.com/in/username')).toBe('username')
    expect(getLinkedInUsername('https://www.linkedin.com/in/username/')).toBe('username')
    expect(getLinkedInUsername('fr.linkedin.com/in/123/fr')).toBe('123')
    expect(getLinkedInUsername('www.linkedin.com/in/123/')).toBe('123')
    expect(getLinkedInUsername('linkedin.com/in/123')).toBe('123')
})

test('getTwitterUsername', () => {
    expect(getTwitterUsername('https://www.twitter.com/')).toBe('')
    expect(getTwitterUsername('https://www.twitter.com/username')).toBe('username')
    expect(getTwitterUsername('https://www.twitter.com/username/')).toBe('username')
    expect(getTwitterUsername('https://www.twitter.com/123')).toBe('123')
    expect(getTwitterUsername('www.twitter.com/123/')).toBe('123')
    expect(getTwitterUsername('twitter.com/123/')).toBe('123')
})




