export function addOffset(map) {
    const offsetY = map.getSize().y * 0.12;

    map.panBy([0, -offsetY], {animate: false});
}