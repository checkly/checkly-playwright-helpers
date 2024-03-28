# Checkly Playwright Helpers

`@checkly/playwright-helpers` is included in runtime 2023.09 and later, this library is only meant to be used within [Checkly](https://checklyhq.com) Multistep and Browser checks.

## Installation

`npm i @checkly/playwright-helpers`

## Methods

### markCheckAsDegraded

Marks a check as degraded if:

- The check is failing with soft assertions, or
- The check has no failures

```
import { markCheckAsDegraded } from '@checkly/playwright-helpers'

test("Checkly Multistep", async ({ request }) => {
  test.step('Google', () => {
    const response = await request.get('https://google.com')
    const data = await response.json()

    if (data.foo.length > 100) {
      markCheckAsDegraded('Foo is too long.')
    }
  })
})
```

#### Arguments

- `reason` String (optional). Logged when the method is called. Used to identify which method caused the degradation.

### getAPIResponseTime

Gets the request response time.

```
import { getAPIResponseTime } from '@checkly/playwright-helpers'

test("Checkly Multistep", async ({ request }) => {
  test.step('Google', () => {
    const response = await request.get('https://google.com')

    console.log(getAPIResponseTime(response))
  })
})
```

#### Arguments

- `response` [APIResponse](https://playwright.dev/docs/api/class-apiresponse) (required). A response from a Playwright API request.

## Support

Feel free to reach out to our customer support if you have any questions [support@checklyhq.com](mailto:support@checklyhq.com).
