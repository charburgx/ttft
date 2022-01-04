import { v1 as uuidv1 } from 'uuid'

export function genSlug(title: string) {
    const safe_title = title.replace(/[^A-Za-z0-9 ]/g, '')
        .replace(/^\s*|\s*$/g, "")
        .replace(/^\s*|\s(?=\s)|\s*$/g, "")
        .toLowerCase()

    const text = safe_title
        .split(' ')
        .splice(0, 4)
        .join('-')

    const uuid = uuidv1().substring(0, 6)

    return uuid + '-' + text
}