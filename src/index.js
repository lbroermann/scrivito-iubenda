import * as React from 'react';
import * as Scrivito from 'scrivito';
import axios from 'axios';

function isIubendaApiUrl(value) {
    try {
        const url = new URL(value);

        return (
            url.protocol === 'https:' &&
            url.hostname === 'www.iubenda.com' &&
            url.pathname.startsWith('/api/')
        );
    } catch (error) {
        return false;
    }
}

Scrivito.provideWidgetClass('iubendaPrivacyWidget', {
    attributes: {
      privacy: 'string',
      cookie: 'string',
    },
});

Scrivito.provideEditingConfig('iubendaPrivacyWidget', {
    title: 'iubenda Privacy Policy Widget',
  
    attributes: {
      privacy: {
        title: 'Privacy Policy',
        description: 'Insert the url to the privacy policy.',
      },
  
      cookie: {
        title: 'Cookie Policy',
        description: 'Insert the url to the cookie policy.',
      },
    },
  
    properties: ['privacy', 'cookie'],
});

class iubendaPrivacyWidget extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { privacyresponse: '', cookieresponse: '' };
    }

    componentDidMount() {
        const widget = this.props.widget;
        if(isIubendaApiUrl(widget.get("privacy")))
        {
            axios.get(widget.get("privacy"))
            .then(response => {
                if (typeof response.data.content === 'string') {
                    this.setState({ privacyresponse: response.data.content });
                } else {
                    this.setState({ privacyresponse: 'The privacy policy API response is invalid' });
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({ privacyresponse: error })
            });
        }
        else    {
            this.setState({ privacyresponse: 'Please insert the privacy policy API url' })
        }

        if(isIubendaApiUrl(widget.get("cookie")))
        {
            axios.get(widget.get("cookie"))
            .then(response => {
                if (typeof response.data.content === 'string') {
                    this.setState({ cookieresponse: response.data.content });
                } else {
                    this.setState({ cookieresponse: 'The cookie policy API response is invalid' });
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({ cookieresponse: error })
            });
        }
        else    {
            this.setState({ cookieresponse: 'Please insert the cookie-guidelines API url' })
        }
    }

    render() {
        return (
        <div>
            <div id="iubenda-privacy"><div dangerouslySetInnerHTML={{__html: this.state.privacyresponse}} /></div>
        <hr />
            <div id="iubenda-cookie"><div dangerouslySetInnerHTML={{__html: this.state.cookieresponse}} /></div>
        </div>
        )
    }
}

Scrivito.provideComponent('iubendaPrivacyWidget', iubendaPrivacyWidget);
