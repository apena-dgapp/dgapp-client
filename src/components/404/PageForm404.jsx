import React from 'react';
import Images from '../../common/images';
import { FormattedMessage } from 'react-intl';

const PageForm404 = () => {
    return (
        <>
            <div className='container-page404'>
                <figure >
                    <img className='img-page404' src={Images.sad} alt=''></img>
                </figure>
                <p className='title-page404'>
                    <FormattedMessage id={'page404.title'} defaultMessage={'404'} />
                </p>
                <p className='subtitle-page404'>
                    <FormattedMessage id={'page404.subtitle'} defaultMessage={'Page not found!'} />
                </p>
            </div>
        </>
    )
}

export default PageForm404