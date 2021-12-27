type environments = "production" | "staging" | "local"

export const url: { [key in environments]: string } = {
    production: 'https://techtoolsforteachers.org',
    staging: 'https://staging.techtoolsforteachers.org',
    local: 'http://localhost:3000'
}

export function getEnv(head: HTMLHeadElement): environments {
    const token = head.querySelector('meta[name="env"]');
    let env = 'production'

    if(token && token instanceof HTMLMetaElement) {
        env = token.content
    }

    return env as environments
}

export function getURL(head: HTMLHeadElement) {
    const env = getEnv(head)

    return url[env as environments] ?? url.production
}