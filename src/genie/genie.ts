import { AbstractGenie, ActiveEnv, IGenieSession, UserContext } from '@sap/gai-core';
import * as path from 'path';
import * as vscode from 'vscode';
import { writeFileSync } from '../util/local-file';
import { SampleGenieSession } from './genie-session';
import profile from './profile';

let index: number = 1;

export class SampleGenie extends AbstractGenie {
  constructor() {
    super(profile);
  }

  /**
   * [Mandatory] The file-level checking machanism for waking up the current BAS genie
   * (It can be invoked when an opened file tab is activated)
   * @param activeEnv 
   * @returns 
   */
  async match(activeEnv: ActiveEnv): Promise<boolean> {
    return true;
    //const pathRegExp = /\.joule$/;
    //return pathRegExp.test(activeEnv.activeFilePath);
  }

  /**
   * The default initial prompt shown in the Joule input field when activating the current BAS genie
   * (It's for UX quick input purpose)
   * @returns 
   */
  async getInitialPrompt(activeEnv: ActiveEnv): Promise<string> {
    return super.getInitialPrompt(activeEnv);
  }

  /**
   * Override the auto attached system messages here
   * @returns 
   */
  async getKnowledge(): Promise<string[]> {
    const knowledge = await super.getKnowledge();
    console.log('BAS Joule: the auto attached system messages are:');
    console.log(knowledge.join('\n'));
    return knowledge;
  }

  /**
   * Override the auto attahced user context messages here
   * @param prompt 
   * @param session 
   */
  async getContextPrompt(prompt: string, session: IGenieSession): Promise<string> {
    const userContext = await super.getContextPrompt(prompt, session);
    console.log('BAS Joule: the auto attached user context message is:');
    console.log(userContext);
    return userContext;
  }

  /**
   * Override the model vendor name here
   * @returns 
   */
  async getModelVendor(): Promise<string> {
    const modeVendor = await super.getModelVendor();
    console.log('BAS Joule: the configured model is:');
    console.log(modeVendor);
    return modeVendor;
  }

  /**
   * Override the model vendor name here
   * @returns 
   */
  async getModelSettings(): Promise<any> {
    const modelSettings = await super.getModelSettings();
    console.log('BAS Joule: the configured model settings are:');
    console.log(modelSettings);
    return modelSettings;
  }

  /**
   * Override the startSession here, inlcuding attach more info to the user context, and use a customized genie session
   * All the conversational chat messages for one specific matched file will be maintained in one GenieSession object
   * @param initialPrompt 
   * @param userContext 
   * @param activeEnv 
   * @returns 
   */
  async startSession(initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv): Promise<IGenieSession> {
    try {
      const profile = await this.getProfile();
      for (const metadataItem of profile.context.metadata) {
        const name = metadataItem.name;
        let contextValue = userContext[name];
        if (!contextValue) {
          contextValue = metadataItem.defaultValue;
        }
        userContext[name] = contextValue;
      }
    } catch (error) {
      console.error(error);
    }
    const genieSession = new SampleGenieSession(this, initialPrompt, userContext, activeEnv);
    this.sessions.push(genieSession);
    return genieSession;
    // return super.startSession(initialPrompt, userContext, activeEnv);
  }

  // no need the custom implementation any more, since it could be achieved by the predefined BAS agent `file:copyResponse` (see profile.ts)
  /**
  /  * The custom implementation for the user action `accept` defined in profile
    * @param response 
    * @param session 
    * @returns 
    */
   async accept(response: string, session: IGenieSession): Promise<boolean> {
     if (response) {
       try {
        const activeEnv = await session.getActiveEnv();
        const chatHistory =  await session.getChatHistory()
        const responseData = chatHistory[0].response;
        //const pattern: RegExp = /Sure, here are the files and their content:\r?\n\r?\n\*\*\*\r?\n([\s\S]*)/;

//        const pattern: RegExp = /Sure, here are the files and their content:\n\n\*\*\*\n\s*(.*)/s;
        //const match: RegExpMatchArray | null = responsData.match(pattern);
        const splitContent = responseData.split('***');

           // Check if there are at least two elements in the array
           if (splitContent.length >= 2) {
            // The content after the specified string is in the second element
            const contentAfterString: string = splitContent[index].trim();
            index = index + 2
            const fileNameWithoutBackticks = contentAfterString.replace(/`/g, '');
            const filePath = path.join(activeEnv.projectInfo?.path, "src","AIResponse", fileNameWithoutBackticks );
            console.log(filePath);
            writeFileSync(filePath, response);
        } else {
            console.log("Delimiter not found in the input string.");
        }


     //    const activeEnv = await session.getActiveEnv();
     //    const filePath = path.join(activeEnv.projectInfo?.path, activeEnv.activeFilePath);
     //    writeFileSync(filePath, response);
         return true;
       } catch (error) {
         console.error(error);
       }
     }
     return false;
   }

  /**
   * The custom implementation for the user action `showResult` defined in profile
   * @param response 
   * @param session 
   * @returns 
   */
  async showResult(response: string, session: IGenieSession): Promise<boolean> {
    if (response) {
      vscode.window.showInformationMessage("Result--"+response);
      return true;
    }
    return false;
  }
}
