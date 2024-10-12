import Link from "next/link";
import { PropsWithChildren } from "react";
import { LinkIt, LinkItUrl } from 'react-linkify-it'

interface LinkifyProps extends PropsWithChildren { }
const Linkfy = ({ children }: LinkifyProps) => {
    return (
        <LinkifyMention>
            <LinkifyhashTag>
                <LinkifyUrl>
                    {children}
                </LinkifyUrl>
            </LinkifyhashTag>
        </LinkifyMention>
    )
}
const LinkifyUrl = ({ children }: LinkifyProps) => {
    return (
        <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
    )
}
const LinkifyhashTag = ({ children }: LinkifyProps) => {
    return (
        <LinkIt regex={/(#[a-zA-Z0-9]+)/}
            component={
                (match, key) => {
                    return <Link href={`/hashtag/${match.slice(1)}`} className="text-primary hover:underline">{match}</Link>
                }
            }>
            {children}
        </LinkIt>
    )
}

const LinkifyMention = ({ children }: LinkifyProps) => {
    return (
        <LinkIt regex={/(@[a-zA-Z0-9_-]+)/} component={(match, key) => {
            console.log('match', match);
            return <Link className="text-primary hover:underline" href={`/users/${match.slice(1)}`} >{match}</Link>
        }}>{children}</LinkIt>
    )
}

export default Linkfy;