import fs from 'fs';
import path from 'path';

describe('Public directory files', () => {
  it('should have a non-empty favicon.ico file', () => {
    const faviconPath = path.resolve(__dirname, '../../../public/favicon.ico');
    expect(fs.existsSync(faviconPath)).toBe(true);
    const stats = fs.statSync(faviconPath);
    expect(stats.size).toBeGreaterThan(0);
  });

  it('should have a manifest.json file', () => {
    const manifestPath = path.resolve(__dirname, '../../../public/manifest.json');
    expect(fs.existsSync(manifestPath)).toBe(true);
  });
});
