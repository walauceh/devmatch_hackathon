/*
import { AptosClient, AptosAccount, TxnBuilderTypes } from "aptos";
import { contractAddress, moduleName } from "../utils/constants";

export class VisaApplicationService {
  private client: AptosClient;
  private account: AptosAccount;

  constructor(nodeUrl: string, privateKey: string) {
    this.client = new AptosClient(nodeUrl);
    this.account = new AptosAccount(privateKey);
  }

  async applyForVisa(name: string, passportNumber: string): Promise<void> {
    const payload = {
      type: "entry_function_payload",
      function: `${contractAddress}::${moduleName}::apply_for_visa`,
      arguments: [name, passportNumber],
    };
    await this.client.generateSignSubmitTransaction(this.account, payload);
  }

  async uploadDocument(documentType: string): Promise<void> {
    const payload = {
      type: "entry_function_payload",
      function: `${contractAddress}::${moduleName}::upload_document`,
      arguments: [documentType],
    };
    await this.client.generateSignSubmitTransaction(this.account, payload);
  }

  async approveVisa(applicantAddress: string): Promise<void> {
    const payload = {
      type: "entry_function_payload",
      function: `${contractAddress}::${moduleName}::approve_visa`,
      arguments: [applicantAddress],
    };
    await this.client.generateSignSubmitTransaction(this.account, payload);
  }

  async isVisaApproved(applicantAddress: string): Promise<boolean> {
    const result = await this.client.view({
      function: `${contractAddress}::${moduleName}::is_visa_approved`,
      arguments: [applicantAddress],
    });
    return result[0] as boolean;
  }
} */
