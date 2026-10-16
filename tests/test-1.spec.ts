import { test, expect, type Page, type Locator } from '@playwright/test';

interface Elements {
locator: (page: Page) => Locator;
name: string;
text?: string;
attribute?: {
    type: string;
    value: string;
  };
}
const elements: Elements[] = [
    {
        locator: (page: Page) => page.getByRole('link', { name: 'Playwright logo Playwright'}),
        name: 'Playwright logo Playwright',
        text: 'Playwright',
        attribute: {
            type: 'href',
            value: '/'
        }
    },
    {
        locator: (page: Page) => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs',
        text: 'Docs',
        attribute: {
            type: 'href',
            value: '/docs/intro'
        }
    },
     {
        locator: (page: Page) => page.getByRole('link', { name: 'MCP', exact: true }),
        name: 'MCP',
        text: 'MCP',
        attribute: {
            type: 'href',
            value: '/mcp/introduction'
        }
    },
     {
        locator: (page: Page) => page.getByRole('link', { name: 'CLI', exact: true }),
        name: 'CLI',
        text: 'CLI',
        attribute: {
            type: 'href',
            value: '/agent-cli/introduction'
        }
     },
     {
        locator: (page: Page) => page.getByRole('link', { name: 'API' }),
        name: 'API',
        text: 'API',
        attribute: {
            type: 'href',
            value: '/docs/api/class-playwright'
        }
    },
    {
        locator: (page: Page) => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js',
        text: 'Node.js',
        attribute: {
            type: 'href',
            value: '#'
        }
    },
    {
        locator: (page: Page) => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository',
        attribute: {
            type: 'href',
            value: 'https://github.com/microsoft/playwright'
        }
    },
    {
        locator: (page: Page) => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server',
        attribute: {
            type: 'href',
            value: 'https://aka.ms/playwright/discord'
        }
    },
     {
        locator: (page: Page) => page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch between dark and light'        
    },
      {
        locator: (page: Page) => page.getByRole('button', { name: 'Search (Control+k)' }),
        name: 'Search'
    }, 
    {
        locator: (page: Page) => page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.'
    },
    {
        locator: (page: Page) => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
            type: 'href',
            value: '/docs/intro'
        }
    },
];  

test.describe('Test of the main page', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
});


test('Checking navigation menu', async ({ page }) => {
    for (const { locator, name } of elements) {
        await test.step(`Checking ${name} is displayed`, async () => {
            await expect.soft(locator(page)).toBeVisible();
        });
    }
});

test('Navigation elements have correct names', async ({ page }) => {

for (const { locator, name, text } of elements) {
    await test.step(`Checking that ${name} contains the expected text`, async () => {
        if (text) {
            await expect.soft(locator(page)).toContainText(text);
        }
    });
}
 
// await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright'); 
// await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
// await expect(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
// await expect(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
// await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
// await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
});


test('Verify href attributes of navigation menu items', async ({ page }) => {
    for (const { locator, name, attribute } of elements) {
        await test.step(`Verify href attribute of ${name}`, async () => {
            if (attribute) {
                await expect.soft(locator(page)).toHaveAttribute(
                    attribute.type,
                    attribute.value
                );
            }
        });
    }
});

 
//await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href', '/'); 


test('Check switching between dark and light mode', async ({ page }) => {
 
await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
await page.getByRole('button', { name: 'Switch between dark and light' }).click();
await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

});

// test('Clicking on get Started button and move to the coresponded page', async ({ page }) => {
 
// await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
// await expect(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
// await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');

// });

});

