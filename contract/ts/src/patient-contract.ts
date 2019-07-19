/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Patient } from './patient';

@Info({title: 'PatientContract', description: 'My Smart Contract' })
export class PatientContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async patientExists(ctx: Context, patientId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(patientId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createPatient(ctx: Context, patientId: string, value: string): Promise<void> {
        const exists = await this.patientExists(ctx, patientId);
        if (exists) {
            throw new Error(`The patient ${patientId} already exists`);
        }
        const patient = new Patient();
        patient.value = value;
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }

    @Transaction(false)
    @Returns('Patient')
    public async readPatient(ctx: Context, patientId: string): Promise<Patient> {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const buffer = await ctx.stub.getState(patientId);
        const patient = JSON.parse(buffer.toString()) as Patient;
        return patient;
    }

    @Transaction()
    public async updatePatient(ctx: Context, patientId: string, newValue: string): Promise<void> {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const patient = new Patient();
        patient.value = newValue;
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }

    @Transaction()
    public async deletePatient(ctx: Context, patientId: string): Promise<void> {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        await ctx.stub.deleteState(patientId);
    }

}
