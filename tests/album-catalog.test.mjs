import test from "node:test";
import assert from "node:assert/strict";

import {
  countAlbumStickers,
  formatStickerCode,
  validateAlbumCatalog,
} from "../src/lib/album-catalog.js";

const validCatalog = {
  id: "copa-2026",
  name: "Copa do Mundo FIFA 2026",
  total_stickers: 88,
  sections: [
    {
      name: "Seleção do Brasil",
      prefix: "BRA",
      start_number: 1,
      end_number: 20,
    },
    {
      name: "Figurinhas Especiais",
      prefix: "FWC",
      start_number: 1,
      end_number: 68,
    },
  ],
};

test("formatStickerCode pads numeric suffixes", () => {
  assert.equal(formatStickerCode("BRA", 1), "BRA01");
  assert.equal(formatStickerCode("FWC", 68), "FWC68");
});

test("countAlbumStickers sums every section", () => {
  assert.equal(countAlbumStickers(validCatalog.sections), 88);
});

test("validateAlbumCatalog accepts a valid catalog shape", () => {
  assert.deepEqual(validateAlbumCatalog(validCatalog), validCatalog);
});

test("validateAlbumCatalog rejects inconsistent totals", () => {
  assert.throws(
    () =>
      validateAlbumCatalog({
        ...validCatalog,
        total_stickers: 89,
      }),
    /total_stickers/i,
  );
});