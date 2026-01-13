function NewWord(word, x, y) {
  this.word = word;
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = 8;
  this.maxForce = 0.8;
  // this.lifeSpan = 255.0;

  this.wanderTheta = PI / 2;
}

NewWord.prototype.seek = function (target) {
  let force = p5.Vector.sub(target, this.pos);
  force.setMag(this.maxSpeed);
  force.sub(this.vel);
  force.limit(this.maxForce);
  return force;
};

NewWord.prototype.wander = function (target) {
  let wanderPoint = this.vel.copy();
  wanderPoint.setMag(100);
  wanderPoint.add(this.pos);
  // fill(255, 0, 0);
  // circle(wanderPoint.x, wanderPoint.y, 16);

  let wanderRadius = 50;
  // noFill();
  // circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2);

  let theta = this.wanderTheta + this.vel.heading();

  let x = wanderRadius * cos(theta);
  let y = wanderRadius * sin(theta);
  wanderPoint.add(x, y);
  // fill(0, 255, 0);
  // circle(wanderPoint.x, wanderPoint.y, 16);

  let steer = wanderPoint.sub(this.pos);
  steer.setMag(this.maxForce);
  this.applyForce(steer);

  let displaceRange = 0.7;
  this.wanderTheta += random(-displaceRange, displaceRange);
  // let displaceRadius = 25;
  // noFill();
  // circle(wanderPoint.x + x, wanderPoint.y + y, displaceRadius * 2);

  // let delta = 0;
  // let xDisplace = displaceRadius * cos(delta);
  // let yDisplace = displaceRadius * sin(delta);
  // fill(0, 0, 255);
  // circle(wanderPoint.x + x + xDisplace, wanderPoint.y + y + yDisplace, 8);
};

NewWord.prototype.arrive = function (target) {
  let force = p5.Vector.sub(target, this.pos);
  let desiredSpeed = this.maxSpeed;
  let slowRadius = 100;
  let distance = force.mag();
  if (distance < slowRadius) {
    desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
  }
  force.setMag(desiredSpeed);
  force.sub(this.vel);
  force.limit(this.maxForce);

  return force;
};

NewWord.prototype.applyForce = function (force) {
  this.acc.add(force);
};

NewWord.prototype.update = function () {
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.set(0, 0);

  // this.lifeSpan -= 0.5;
};

NewWord.prototype.show = function () {
  textFont(font);
  textSize(16);
  fill(255); //insert this.lifeSpan as second argument if isDead functions is implemented
  textAlign(CENTER, CENTER);
  text(this.word, this.pos.x, this.pos.y);
};

NewWord.prototype.checkEdges = function () {
  let padding = 10;
  if (this.pos.x > width - padding) {
    this.vel.mult(-1, 1);
  } else if (this.pos.x < padding) {
    this.vel.mult(-1, 1);
  }
  if (this.pos.y > height - padding) {
    this.vel.mult(1, -1);
  } else if (this.pos.y < padding) {
    this.vel.mult(1, -1);
  }
};

NewWord.prototype.isDead = function () {
  return this.lifeSpan < 0.0;
};
