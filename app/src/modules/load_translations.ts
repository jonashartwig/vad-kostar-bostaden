export function load_translations() {
    return require.context("../translations", false, /\.json$/);
}