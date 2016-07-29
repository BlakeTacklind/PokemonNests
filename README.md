# Pokemon Nests

The Goal of this project is to discover Pokemon Nests. These are high concentrations of a perticular type of Pokemons.

### The Plan

This will use pokevision's Niantic server queries to discover what is in a local area and log and map them. After some data is logged it will begin the discovery process to find higher concentrations of pokemon. This program will involve converting from longitude and latitude to a XY cooridinate system, circle packing to minimize the number of scans nessasary, clustering to find concentrations, and dicovering bounds to these 'nest' areas.