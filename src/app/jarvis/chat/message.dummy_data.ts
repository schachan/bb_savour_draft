export const messageData: any = [{
    "attachments": [
        {
            "title": "PINT SEARCH",
            "text": "ps/(PINT search) by default <keyword> is search for in “id” field",
            "query_help": true,
            "fields": [{
                "title": "source",
                "value": "s"
                }, {
                "title": "env",
                "value": "env"
                }
            ],
        }
    ]
},
{
    "attachments": [        
        {
            "title": "Time series meta data",
            "text": "Time series meta data tags -- “Get available meta data for a specific time series"
        }
    ]
}, 
{
    "attachments": [        
        {
            "fallback": "Would you recommend it to customers?",
            "title": "Would you recommend it to customers?",
            "callback_id": "comic_1234_xyz",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions_inline": true,
            "actions": [{
                "name": "recommend",
                "text": "Recommend",
                "type": "button",
                "value": "recommend"
            }, {
                "name": "no",
                "text": "No",
                "type": "button",
                "value": "bad"
            }]   
        }        
    ]
},
{
    "attachments": [
             
        {
            "fallback": "SEARCH OPTIONS",
            "title": "SEARCH OPTIONS",
            "callback_id": "comic_1234_xyz",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions_inline": false,
            "actions": [{
                "button_label": "PTPE SEARCH",
                "name": "ptpe_search",
                "text": "Help PTPE",
                "type": "button",
                "value": "ptpe"
            }, {
                "button_label": "JIRA SEARCH",
                "name": "jira_search",
                "text": "Help JIRA Search",
                "type": "button",
                "value": "jira"
            }]   
        } 
    ]
},

{
    "attachments": [
        
        {
            "title": "PS BETAPM",
            "color": "#F15A2D",
            "fields": [{
                "title": "ID",
                "value": "betapmmq.queue.manager"
            }, {
                "title": "Message",
                "value":"Notifying QM max connection"
            }, {
                "title": "Environment",
                "value": "BETA"
            }, {
                "title": "Depth",
                "value": "0"
            }, {
                "title": "Writers",
                "value": "0"
            }, {
                "title": "Status",
                "value": "MQQMSTA_RUNNING"
            }, {
                "title": "MaxxConn",
                "value": "1229"
            }, {
                "title": "Source",
                "value": "MQ"
            }, {
                "title": "Severity",
                "value": "High"
            }, {
                "title": "Queuemanager",
                "value": "betapmmq.queue.manager"
            }, {
                "title": "Readers",
                "value": "0"
            }, {
                "title": "MaxAge",
                "value": "0"
            }, {
                "title":"Queue",
                "value": "-----"
            }, {
                "title": "Time",
                "value": "2018/01/22 22:13:46"
            }]
        }
    ]
},
{
    "attachments": [                
        {
            "color": "#1CBCD4",
            "query_help": false,
            "fields": [{
                "title": "ID",
                "value": "betapmmq.queue.manager"
            }, {
                "title": "Message",
                "value":"Notifying QM max connection"
            }, {
                "title": "Environment",
                "value": "BETA"
            }, {
                "title": "Depth",
                "value": "0"
            }, {
                "title": "Writers",
                "value": "0"
            }, {
                "title": "Status",
                "value": "MQQMSTA_RUNNING"
            }, {
                "title": "MaxxConn",
                "value": "1229"
            }, {
                "title": "Source",
                "value": "MQ"
            }, {
                "title": "Severity",
                "value": "High"
            }, {
                "title": "Queuemanager",
                "value": "betapmmq.queue.manager"
            }, {
                "title": "Readers",
                "value": "0"
            }, {
                "title": "MaxAge",
                "value": "0"
            }, {
                "title":"Queue",
                "value": "-----"
            }, {
                "title": "Time",
                "value": "2018/01/22 22:13:46"
            }]
        } 
    ]
}]