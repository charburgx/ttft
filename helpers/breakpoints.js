const Breakpoints = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
}

// export default Breakpoints

function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
}

const BreakpointsPx = objectMap(Breakpoints, (el) => '' + el + 'px')

exports.Breakpoints = Breakpoints
exports.BreakpointsPx = BreakpointsPx
