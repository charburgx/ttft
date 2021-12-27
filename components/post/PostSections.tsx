import React, { FunctionComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

const PostSections: FunctionComponent<Props> = (props) => {
    return (<>
            <div className="post-sections-wrapper">
                <ul className="post-sections">
                    {React.Children.map(props.children, (child, i) =>
                        <li className="post-section"><div className="p-4">{child}</div></li>)
                    }
                </ul>
            </div>
        </>
  );
};

export default PostSections;
