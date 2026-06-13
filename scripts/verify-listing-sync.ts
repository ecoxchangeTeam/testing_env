import assert from "node:assert/strict";
import {
  getEcoDppId,
  isEcoXchangeOrigin,
  mapCampusKarttListingStatus,
} from "../src/lib/campuskartt-sync";

function verifyCampusKartOnlyListingsAreSkipped() {
  const campusKartOnlyPayload = {
    id: "ck-only-123",
    source: "campuskartt",
    title: "CampusKart-only listing",
    price: 1200,
  };

  assert.equal(getEcoDppId(campusKartOnlyPayload), null);
  assert.equal(isEcoXchangeOrigin(campusKartOnlyPayload), false);
}

function verifyEcoXchangeMirroredListingsAreAccepted() {
  assert.equal(
    isEcoXchangeOrigin({
      id: "ck-mirror-123",
      source: "ecoxchange",
      dppId: "ECO-PHN-2024-B2Y7M1NR",
      price: 45000,
    }),
    true
  );

  assert.equal(
    isEcoXchangeOrigin({
      id: "ck-mirror-456",
      source: "campuskartt",
      metadata: { dppId: "ECO-LPT-2024-H6S3H2CD" },
      price: 89000,
    }),
    true
  );
}

function verifyStatusMapping() {
  assert.deepEqual(
    pickStableStatusFields(mapCampusKarttListingStatus("sold")),
    { listingStatus: "SOLD", productStatus: "TRANSFERRED", sold: true }
  );
  assert.deepEqual(
    pickStableStatusFields(mapCampusKarttListingStatus("cancelled")),
    { listingStatus: "CANCELLED", productStatus: "ACTIVE", sold: false }
  );
  assert.deepEqual(
    pickStableStatusFields(mapCampusKarttListingStatus("expired")),
    { listingStatus: "EXPIRED", productStatus: "ACTIVE", sold: false }
  );
  assert.deepEqual(
    pickStableStatusFields(mapCampusKarttListingStatus("active")),
    { listingStatus: "ACTIVE", productStatus: "LISTED", sold: false }
  );
  assert.equal(mapCampusKarttListingStatus("unknown-status"), null);
}

function pickStableStatusFields(
  mapped: ReturnType<typeof mapCampusKarttListingStatus>
) {
  assert.ok(mapped);
  return {
    listingStatus: mapped.listingStatus,
    productStatus: mapped.productStatus,
    sold: mapped.soldAt instanceof Date,
  };
}

verifyCampusKartOnlyListingsAreSkipped();
verifyEcoXchangeMirroredListingsAreAccepted();
verifyStatusMapping();

console.log("Listing sync policy verified.");
console.log("- CampusKart-only listings are not imported into EcoXchange.");
console.log("- EcoXchange-origin mirrored listings are eligible for synchronization.");
console.log("- CampusKartt status updates map to explicit EcoXchange listing/product states.");
