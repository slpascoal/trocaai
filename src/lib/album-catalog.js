function assertInteger(value, message) {
  if (!Number.isInteger(value)) {
    throw new TypeError(message);
  }
}

export function formatStickerCode(prefix, number) {
  if (typeof prefix !== "string" || prefix.trim().length === 0) {
    throw new TypeError("prefix must be a non-empty string");
  }

  assertInteger(number, "number must be an integer");
  if (number < 0) {
    throw new RangeError("number must be greater than or equal to 0");
  }

  const formattedNumber = String(number).padStart(2, "0");
  return `${prefix}${formattedNumber}`;
}

export function countAlbumStickers(sections) {
  if (!Array.isArray(sections)) {
    throw new TypeError("sections must be an array");
  }

  return sections.reduce((total, section) => {
    const { start_number: startNumber, end_number: endNumber } = section;

    assertInteger(startNumber, "section start_number must be an integer");
    assertInteger(endNumber, "section end_number must be an integer");

    if (startNumber > endNumber) {
      throw new RangeError("section start_number must be less than or equal to end_number");
    }

    return total + (endNumber - startNumber + 1);
  }, 0);
}

function validateSection(section, index, seenPrefixes) {
  if (section === null || typeof section !== "object" || Array.isArray(section)) {
    throw new TypeError(`section at index ${index} must be an object`);
  }

  const { name, prefix, start_number: startNumber, end_number: endNumber } = section;

  if (typeof name !== "string" || name.trim().length === 0) {
    throw new TypeError(`section at index ${index} must have a non-empty name`);
  }

  if (typeof prefix !== "string" || prefix.trim().length === 0) {
    throw new TypeError(`section at index ${index} must have a non-empty prefix`);
  }

  if (seenPrefixes.has(prefix)) {
    throw new RangeError(`section prefix ${prefix} must be unique`);
  }

  seenPrefixes.add(prefix);

  assertInteger(startNumber, `section ${prefix} start_number must be an integer`);
  assertInteger(endNumber, `section ${prefix} end_number must be an integer`);

  if (startNumber <= 0) {
    throw new RangeError(`section ${prefix} start_number must be greater than 0`);
  }

  if (endNumber < startNumber) {
    throw new RangeError(`section ${prefix} end_number must be greater than or equal to start_number`);
  }

  const firstCode = formatStickerCode(prefix, startNumber);
  const lastCode = formatStickerCode(prefix, endNumber);

  if (typeof firstCode !== "string" || typeof lastCode !== "string") {
    throw new TypeError(`section ${prefix} must produce valid sticker codes`);
  }
}

export function validateAlbumCatalog(catalog) {
  if (catalog === null || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new TypeError("catalog must be an object");
  }

  const { id, name, total_stickers: totalStickers, sections } = catalog;

  if (typeof id !== "string" || id.trim().length === 0) {
    throw new TypeError("catalog id must be a non-empty string");
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    throw new TypeError("catalog name must be a non-empty string");
  }

  assertInteger(totalStickers, "catalog total_stickers must be an integer");

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new TypeError("catalog sections must be a non-empty array");
  }

  const seenPrefixes = new Set();
  for (const [index, section] of sections.entries()) {
    validateSection(section, index, seenPrefixes);
  }

  const countedStickers = countAlbumStickers(sections);
  if (countedStickers !== totalStickers) {
    throw new RangeError(
      `catalog total_stickers must equal the number of stickers described by sections (${countedStickers})`,
    );
  }

  return catalog;
}