import { GenieProfile } from "@sap/gai-core";
 
const profile: GenieProfile = {
  "ID": "sample-genie",
  "version": "1.0",
  "name": "Sample Joule Data",
  "description": "I’m Joule, your specialized AI assistant. I can help you from an alien perspective.  \n  \nSo, whenever you need help, just ask, and I'll be here to make your experience even better.  \n  \nThough I strive for perfection, I might not get everything right all the time.  \n",
  "knowledge": {
    "role": "Imagine you are a helpful assistant Who can quickly provide reliable answers quickly.",
    "rules": [
      "Requirement: please show your whole output in Markdown ."
    ]
  },
  "feature": {
    "maxChatRounds": NaN
  },
  "examples": [
    {
      name: "about fiori application",
      description: "Can you explain how to create Fiori application?"
    },
    {
      name: "about odata",
      description: "What is Odata?"
    },
    {
      name: "about destinations",
      description: "How to create destination in BTP?"
    }
  ],
  "context": {
    "metadata": [
      {
        "name": "dataJoule",
        "description": "The joule data file",
        "type": "file",
        "defaultValue": "./data.jrule",
        "visible": false
      }
    ],
    "contextSyntax": ""
  },
  "llmModel": {
    vendor: "openai-gpt",
    settings: {
      deployment_id: "gpt-4",
      temperature: 0.2
    }
  },
  "actions": [{
    "name": "accept",
    "label": "Accept PlainText",
    "language": "plaintext",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept Json",
    "language": "json",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept Html",
    "language": "html",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept JavaScript",
    "language": "javascript",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept Xml",
    "language": "xml",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept CSS",
    "language": "css",
    "icon": "codicon-insert"
  },{
    "name": "accept",
    "label": "Accept Properties",
    "language": "properties",
    "icon": "codicon-insert"
  },{
    "name": "showResult",
    "label": "Show Result",
    "language": "plaintext",
    "icon": "codicon:info"
  }]
};
 
export default profile;
