'use strict';

import * as vscode from 'vscode';
import {SampleGenie} from './genie/genie';
import {BasToolkit} from '@sap-devx/app-studio-toolkit-types';

const basAPI: BasToolkit = vscode.extensions.getExtension(
	'SAPOSS.app-studio-toolkit'
)?.exports;

export async function activate(context: vscode.ExtensionContext) {
	basAPI
    .getExtensionAPI<any>('SAPSE.joule')
    .then((jouleAPI: any) => {
        // register SampleGenie
	    const sampleGenie = new SampleGenie();
	    return jouleAPI.registerGenie(sampleGenie);
    });
}

export function deactivate() {
	console.info('Deactivating extension!');
}