var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      
var Particle = function(x, y, d, c)
{
    this.position = new PVector(x, y);
    this.acceleration = new PVector(0, 0.2);
    this.velocity = new PVector(random(-2, 2), random(-3, 3));
    
    this.color = c;
    this.diameter = d;
    
    this.lifeTime = 50;
    this.life = 0;
    
    this.kill = false;
    
    this.draw = function() 
    {   
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, 
        this.diameter * random(0.5, 1.5), 
        this.diameter * random(0.5, 1.5));
    };
    
    this.update = function()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity); 
        this.life += 1;
        
        if(this.life >= this.lifeTime)
        {
            this.kill = true;   
        }
    };
};

var particles = [];
particles.maxLength = 300;
particles.create = function(x, y, amt, radius, color, velocityPV, lifeTime)
{
    for(var i = 0; i < amt; i++)
    {
        var particle = new Particle(
            x + random(-radius, radius), 
            y + random(-radius, radius), 
            5, color);
        particle.lifeTime = i; 
        if(velocityPV !== undefined)
        {
            particles.velocity = velocityPV;
        }
        if(lifeTime !== undefined)
        {
            particles.lifeTime = lifeTime;
        }
        this.push(particle);
    }
};
particles.draw = function()
{
    for(var i = 0; i < this.length; i++)
    {
        this[i].draw();
    }
};
particles.update = function()
{
    for(var i = 0; i < this.length; i++)
    {
        this[i].update();
        if(this[i].kill)
        {
            this.splice(i, 1);   
        }
    }
    if(this.length > this.maxLength)
    {
        this.length = this.maxLength;
    }
};

var lavaParticles = [];
lavaParticles.maxLength = 50;
lavaParticles.create = particles.create;
lavaParticles.update = particles.update;
lavaParticles.draw = particles.draw;

draw = function() 
{
    background(147, 221, 250);

    lavaParticles.create(147, 214, random(15, 20), 3, color(240, 100, 50), 20);
    lavaParticles.create(271, 220, random(15, 20), 5, color(240, random(80, 100),51),20);
    
    lavaParticles.draw();
    lavaParticles.update();
    
    //text(lavaParticles.length, 20, 20);
    
    noStroke();
    fill(207, 83, 45, 230);
    
    beginShape();
    vertex(1, 376);
    vertex(135, 214);
    vertex(155, 214);
    vertex(220, 380);
    endShape(CLOSE);
    
    beginShape();
    vertex(148, 376);
    vertex(259, 214);
    vertex(277, 214);
    vertex(304, 380);
    endShape(CLOSE);
    
    fill(207, 83, 45);
    quad(-13, 400, 153, 400, 123, 261, 45, 284);
    
    beginShape();
    vertex(245, 349);
    vertex(405, 400);
    vertex(382, 227);
    vertex(309, 243);
    endShape(CLOSE);
    
    beginShape();
    vertex(120, 374);
    vertex(351, 383);
    vertex(264, 317);
    vertex(233, 267);
    endShape(CLOSE);
    
    triangle(119, 377, 221, 464, 264, 237);
    
    fill(230, 95, 46);
    triangle(120, 374, 233, 267, 253, 299);
    triangle(132, 304, 123, 262, 45, 285);
    triangle(381, 227, 286, 283, 310, 243);
    
    fill(200, 100, 54);
    ellipse(200, 390, 500, 40);
};

    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});