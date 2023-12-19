# joule-contrib-sample
A sample genie in Business Application Studio.

## Project setup
```
npm install
```

### Preparation (just once)
1. search and install the VSCode extension "SAP Business Application Studio toolkit" from `Extensions` side panel

2. install BAS Joule base extension (from `./joule/joule-2.0.0.vsix`)

3. config the service key for Joule (VSCode relaunch required to take the setting change for Joule extension)

In settings -> SAP Joule -> config Joule: Service Key, click "edit in setting.json", and specify the servicekey information. The service key for either SAP AI Core service (new) or BTP LLM Proxy service (old) can be supported. e.g.,

- The settings for SAP AI Core service (new)
```json
  "joule.serviceKey": {
    "clientid": "xxx",
    "clientsecret": "xxx",
    "url": "xxx",
    "identityzone": "...",
    "identityzoneid": "...",
    "appname": "...",
    "serviceurls": {
        "AI_API_URL": "https://api.ai.internalprod.eu-central-1.aws.ml.hana.ondemand.com"
    }
  }
```

- The settings for BTP LLM Proxy service (old)
```json
  "joule.serviceKey": {
    "url": "https://azure-openai-serv-i057149.cfapps.sap.hana.ondemand.com",
    "uaa": {
      "clientid": "xxx",
      "clientsecret": "xxx",
      "url": "xxx",
      "identityzone": "...",
      "identityzoneid": "...",
      "tenantid": "...",
      "tenantmode": "...",
      "sburl": "...",
      "apiurl": "...",
      "verificationkey": "...",
      "xsappname": "...",
      "subaccountid": "...",
      "uaadomain": "...",
      "zoneid": "...",
      "credential-type": "..."
    },
    "vendor": "SAP"
  }
```

### Run and debug

open the root folder of this code repo in your VSCode and go to `Run and Debug` tab, select `Run Genie Sample` and click `Run` button.

> How to check the LLM messages:
the more detail log on LLM prompt and response could be checked from the `DEBUG PANEL` panel, in the VSCode instance for the Joule extension (instead of the debugging `Extension Development Host` VSCode).

### Consume this sample extension with a sample project / folder
a. open the folder `./test/sample`;

b. open the file with suffix .joule, such as `hello.joule`;

c. open Joule UI panel in sidebar;

d. input prompt as needed into the Joule UI panel, and submit it;

e. waiting until the `thinking...` process is done (it may take ~30 seconds for the example question to get an answer from 👽).

f. check the response, and click the `Accept` button if the answer is ok, and the result will be saved into the opened .joule file.

g. add more additional rules in `data.jrule` file, and try again.

> Note: the `./test/sample` is an example for testing.

### How to upgrade when the BAS Joule get updated in local VSCode env
- when you pull the latest codes, and notice below dependencies get updated.
- upgrade BAS extension: right click the vsix file `./joule/joule-2.0.0.vsix`, and press `Install Extension VSIX`.
- upgrade npm modules: `npm i` or `npm update @sap/gai-core`.
- run or debug as normal.