import React, { useReducer, useMemo } from 'react';

const ENFORCE_UNIFORM_COMPONENT_CONTEXTS = true;

const LOG_READ_OPERATIONS = false;
const PRINT_READ_OPERATIONS = true;
const LOG_WRITE_OPERATIONS = true;
const PRINT_WRITE_OPERATIONS = true;

let equilibriumContext = React.createContext(); // Start empty

if (ENFORCE_UNIFORM_COMPONENT_CONTEXTS) {
    React.Component.contextType = equilibriumContext; // TODO: There's got to be a better way to do this than this while still giving the consuming developer the best DX
    // For review context (puns), I'd rather not modify alien structures like this, however,
    // without this line, every consuming component has to either do:
    // class GoodBoy extends EquilibriumDoggoClass
    // or
    // class GoodBoy extends React.Component {
    //   static contextType = Equilibrium
    // }
}

export default equilibriumContext; // TODO: Consider options for this initial population step

export const useEquilibrium = () => {
    const [, forceRender] = useReducer((state) => !state);
    const store = useMemo(() => new Equilibrium(forceRender), []); // Memoize once so we don't clobber.  Always show fresh state.  TODO: Add configurable levels of granularity for performance

    return store;
}

class Equilibrium {
    #forceUpdate; // fn
    log; // Array

    constructor(forceUpdate) {
        console.warn("--------------- GLOBAL DATA STORE ONLINE -----------------");
        this.log = [];
        this.forceUpdate = forceUpdate;

        return new Proxy(this, {
            get: (object, key, receiver) => {
                let reflectedName = object?.constructor?.name;

                if (PRINT_READ_OPERATIONS) {
                    console.log('Equilibrium::get ' + reflectedName + '.' + key);
                }

                if (LOG_READ_OPERATIONS) {
                    this.log.push({ 
                        event: 'read', 
                        context: reflectedName, 
                        key: key, 
                        value: object[key], 
                        time: Date.now() 
                    });
                }
                
                return object[key];
            },
            set: (object, key, value, receiver) => {
                if (PRINT_WRITE_OPERATIONS) {
                    console.log('Equilibrium::set { ' + key + ': ' + value + ' }');
                }

                if (LOG_WRITE_OPERATIONS) {
                    let eventType = (object[key] === undefined) ? 'create' : 'write';
                    this.log.push({ event: eventType, key: key, value: value, time: Date.now() });
                }

                object[key] = value;
                this.forceUpdate(); // Or the DOM won't re-render TODO: Give the consuming developer more choice about what to update
                return true;
            }
        });
    }
}