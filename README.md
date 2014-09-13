D3BioFabric
===========

JavaScript/D3 Version of BioFabric. This is just the rendering component of the Super-Quick Demo. As long as you have a simple graph with
one connected component, in the JSON format used in the miserablesSimple.json file, you should be able to render it OK. BUT it will be slow
for large networks, and the rendering is not optimized for large networks. For example, this image compares the D3 version (top) with the
Java version (bottom) of the Barabasi-Albert Power Law Random Network example (2K nodes, 11979 links)
[provided] (http://www.biofabric.org/sifFiles/ba2K.sif) on the BioFabric SIF files page:

![BioFabric D3 to Java Comparison](http://www.biofabric.org/gallery/images/CompareBFD32Jav1024.png)