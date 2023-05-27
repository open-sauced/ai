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
    expect(getGithubUsername('https://google.com/')).toBe(undefined)
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

test('isGithubPullRequestPage', () => {
  expect(isGithubPullRequestPage('https://www.github.com/')).toBe(false)
  expect(isGithubPullRequestPage('https://www.github.com/pull')).toBe(false)
  expect(isGithubPullRequestPage('https://www.github.com/pull/')).toBe(false)
  expect(isGithubPullRequestPage('https://www.github.com/username/repo/pull/123')).toBe(true)
  expect(isGithubPullRequestPage('https://www.github.com/username/repo/pull/123/')).toBe(true)
  expect(isGithubPullRequestPage('www.github.com/username/repo/pull/123')).toBe(true)
  expect(isGithubPullRequestPage('github.com/username/repo/pull/123/')).toBe(true)
  expect(isGithubPullRequestPage('https://google.com/')).toBe(false)
})

test('isGithubProfilePage', () => {
  expect(isGithubProfilePage('https://www.github.com/')).toBe(false)
  expect(isGithubProfilePage('https://www.github.com/username')).toBe(true)
  expect(isGithubProfilePage('https://www.github.com/username/')).toBe(false)
  expect(isGithubProfilePage('https://www.github.com/username?tab=repositories')).toBe(true)
  expect(isGithubProfilePage('www.github.com/username')).toBe(true)
  expect(isGithubProfilePage('github.com/username')).toBe(true)
  expect(isGithubProfilePage('github.com/username/')).toBe(false)
  expect(isGithubProfilePage('https://google.com/')).toBe(false)
})

test('isGithubRepoPage', () => {
  expect(isGithubRepoPage('https://www.github.com/')).toBe(false)
  expect(isGithubRepoPage('https://www.github.com/username/')).toBe(false)
  expect(isGithubRepoPage('https://www.github.com/username/repo')).toBe(true)
  expect(isGithubRepoPage('https://www.github.com/username/repo/')).toBe(false)
  expect(isGithubRepoPage('https://www.github.com/username/repo/https://google.com/')).toBe(false)
  expect(isGithubRepoPage('www.github.com/username/repo')).toBe(true)
  expect(isGithubRepoPage('github.com/username/repo')).toBe(true)
  expect(isGithubRepoPage('https://google.com/')).toBe(false)
})

test('isPullRequestCreatePage', () => {
  expect(isPullRequestCreatePage('https://www.github.com/')).toBe(false)
  expect(isPullRequestCreatePage('https://github.com/username/repo/compare/')).toBe(false)
  expect(isPullRequestCreatePage('https://github.com/username/repo/compare/https://google.com/')).toBe(true)
  expect(isPullRequestCreatePage('https://github.com/username/repo/compare/https://google.com//')).toBe(true)
  expect(isPullRequestCreatePage('www.github.com/username/repo/compare/https://google.com//')).toBe(true)
  expect(isPullRequestCreatePage('github.com/username/repo/compare/https://google.com//')).toBe(true)
  expect(isPullRequestCreatePage('https://google.com/')).toBe(false)
})

test('isPullRequestFilesChangedPage', () => {
  expect(isPullRequestFilesChangedPage('https://www.github.com/')).toBe(false)
  expect(isPullRequestFilesChangedPage('https://github.com/username/repo/pull/123/files')).toBe(true)
  expect(isPullRequestFilesChangedPage('https://github.com/username/repo/pull/123/files/')).toBe(true)
  expect(isPullRequestFilesChangedPage('www.github.com/username/repo/pull/123/files')).toBe(true)
  expect(isPullRequestFilesChangedPage('github.com/username/repo/pull/123/files/')).toBe(true)
  expect(isPullRequestFilesChangedPage('github.com/username/repo/pull/123/fil')).toBe(false)
  expect(isPullRequestFilesChangedPage('https://google.com/')).toBe(false)
})