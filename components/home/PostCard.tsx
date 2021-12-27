import React, { FunctionComponent } from 'react';
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import {post_image} from "../../api/posts";

interface OwnProps {
    // post: Post
    title: string,
    // content: string,
    className?: string,
    slug: string,
    published_at: string | null,
    draft: boolean,
    category_text?: string | null,
    image_href?: string|null
}

type Props = OwnProps;

const PostCard: FunctionComponent<Props> = ({ title, category_text, slug, image_href, draft, className='' }) => {
  return (
      <Link href={`/post/${slug}`}>
          <a>
            <div className={"p-pcp font-sans bg-bg-50 transition-colors hover:bg-bg-100 border-bg-200 border-[1px] mb-sm xl:max-w-[320px] sm:max-w-[300px] " + className}>
                    <div className="bg-aqua-200 h-2 w-auto -mx-pcp -mt-pcp" />
                    {/* <div className="h-2 bg-main-200 -mt-5"/> */}
                    {/* <div className="border-t-[3rem] mb-[var(--card-top-height)] border-main-200 -mt-pcp -mx-pcp "/> */}
                    {/* <p className="font-semibold mb-1 text-lg font-sans-title block">{title}</p> */}

                {draft ? <p className={"mt-2 -mb-2 text-gray-500"}>DRAFT</p> : ''}

                    <span className="text-aqua-200 font-semibold my-2 text-xl block font-sans-title">{title}</span>

                    { image_href ?
                        <div className="w-auto -mx-pcp bg-main-50 mb-2">
                            <img src={image_href} alt={title} className="w-full" />
                        </div>
                    : ''}


                    {/* <p className="font-sans-title text-aqua-200">{content}</p> */}
                    {/* { published_at ?
                        <div className="block mt-2.5 text-acc-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-1.5 mb-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span
                                className="text-sm">{formatDistance(new Date(published_at), new Date(), {addSuffix: true})}</span>
                        </div> : '' */}
                    {/* } */}

                    { category_text ?
                        <p className="-mb-1 font-sans text-right text-sm text-aqua-200">
                            <strong>{category_text.toUpperCase()}</strong>
                        </p> : ''
                    }
            </div>
          </a>
      </Link>);

};

export default PostCard;
