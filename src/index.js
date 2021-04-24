import * as React from 'react';
import * as Scrivito from 'scrivito';
import axios from 'axios';

Scrivito.provideWidgetClass('iubendaPrivacyWidget', {
    attributes: {
      privacy: 'string',
      cookie: 'string',
    },
});

Scrivito.provideEditingConfig('iubendaPrivacyWidget', {
    title: 'iubenda Privacy Policy Widget',
    //description: 'Displays iubenda Privacy policy',
  
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
        if(widget.get("privacy") != "" && widget.get("privacy").includes("iubenda.com"))
        {
            axios.get(widget.get("privacy"))
            .then(response => {
                this.setState({ privacyresponse: response.data.content });
            })
            .catch(error => {
                console.error(error);
                this.setState({ privacyresponse: error })
            });
        }
        else    {
            this.setState({ privacyresponse: 'Please insert the privacy policy API url' })
        }

        if(widget.get("cookie") != "" && widget.get("cookie").includes("iubenda.com"))
        {
            axios.get(widget.get("cookie"))
            .then(response => {
                this.setState({ cookieresponse: response.data.content });
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