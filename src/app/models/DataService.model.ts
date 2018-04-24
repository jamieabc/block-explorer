export interface DataServiceModel {
    tx_id: string;
    tx_owner: string;
    tx_sequence: string;
    tx_signature: string;
    tx_countersignature: string;
    tx_asset_id: string;
    tx_bitmark_id: string;
    tx_previous_id: string;
    tx_head: string;
    tx_status: string;
    tx_payments: string;
    tx_pay_id: string;
    tx_block_number: string;
    tx_block_offset: string;
    tx_expires_at: string;
    tx_modified_at: string;
    asset_id: string;
    asset_name: string;
    asset_fingerprint: string;
    asset_metadata: {
        description: string;
    };
    asset_registrant: string;
    asset_sequence: string;
    asset_signature: string;
    asset_status: string;
    asset_block_number: string;
    asset_block_offset: string;
    asset_expires_at: string;
    block_number: number;
    next_block_number: number;
    prev_block_number: number;
    block_hash: string;
    block_created_at: string;
    timestamp: string;
}
