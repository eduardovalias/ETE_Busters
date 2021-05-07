class Player {
    constructor(scene, x, y, texture, scale, gravity) {
        this.ps = scene.physics.add.sprite(x, y, texture).setScale(scale)
        this.ps.setGravityY(gravity)
        this.ps.setCollideWorldBounds(true);

        this.pos = 'R'
        this.xSpeed = 300;
        this.isNotJumping = true;

        this.healthBar = new HealthBar(scene, 610, 20);
    }

    damage() {
        this.healthBar.decrease(5)
    }

    move_left() {
        this.ps.body.setSize(262, 690)
        this.ps.body.setOffset(80, 0)
        this.isNotJumping = true
        this.pos = 'L';
        if (!this.ps.body.onFloor()) {
            this.move_left_jump()
        } else {
            this.ps.setVelocityX(-this.xSpeed);
            this.ps.anims.play('left', true);
        }
    }

    move_left_jump() {
        this.ps.body.setOffset(0, 0)
        this.isNotJumping = false
        this.ps.setVelocityX(-this.xSpeed);
        this.ps.anims.play('jumpL', true);
        this.pos = 'L';
    }

    move_right() {
        this.ps.body.setSize(262, 690)
        this.ps.body.setOffset(200, 0)
        this.isNotJumping = true
        this.pos = 'R';
        if (!this.ps.body.onFloor()) {
            this.move_right_jump()
        } else {
            this.ps.setVelocityX(this.xSpeed);
            this.ps.anims.play('right', true);
        }
    }

    move_right_jump() {
        this.ps.body.setOffset(0, 0)
        this.isNotJumping = false
        this.ps.setVelocityX(this.xSpeed);
        this.ps.anims.play('jump', true);
        this.pos = 'R';
    }

    jump() {
        this.isNotJumping = false
        if (this.pos == 'R') {
            this.ps.anims.play('jump', true);
            this.ps.body.setSize(300, 690)
        }
        else if (this.pos == 'L') {
            this.ps.anims.play('jumpL', true);
            this.ps.body.setSize(300, 690)
        }

        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.ps.setVelocityY(-500);
                this.ps.setVelocityX(0);
            } else {
                this.ps.setVelocityY(-400);
                this.ps.setVelocityX(0);
            }
        }
    }

    sneak() {
        if (this.isNotJumping) {
            this.ps.y = 561
        }
        this.ps.body.setSize(299, 385)
        this.ps.setVelocityX(0);
        this.ps.anims.play('down', true);
    }

    stand() {
        this.ps.body.setSize(262, 690)
        this.ps.setVelocityX(0);

        if (this.ps.body.onFloor()) {
            this.isNotJumping = true
            if (this.pos == 'R') {
                this.ps.anims.play('stand', true);
            }
            else if (this.pos == 'L') {
                this.ps.anims.play('standL', true);
            }
        } else {
            this.jump()
        }

    }

    standShot(posit) {
        this.posit = posit
        this.pos = posit

        this.ps.body.setSize(262, 690)
        this.ps.setVelocityX(0);
        this.isNotJumping = true
        this.ps.anims.stop()
        if (this.pos == 'R') {
            if (posit == 'R') {
                this.ps.anims.play('stand', true);
            }
            else if (posit == 'L') {
                this.ps.anims.play('standL', true);
            }
        }
        else if (this.pos == 'L') {
            if (posit == 'L') {
                this.ps.anims.play('standL', true);
            }
            else if (posit == 'R') {
                this.ps.anims.play('stand', true);
            }

        }
    }

    combat() {
        this.ps.setVelocityX(0);

        if (this.ps.body.onFloor()) {
            this.ps.anims.play(this.pos == 'R' ? 'punching' : 'punchingL', true);
            this.ps.body.setSize(320, 690)
            this.ps.body.setOffset(this.pos == 'R' ? 100 : 0, 0)
        } else {
            this.ps.anims.play(this.pos == 'R' ? 'kicking' : 'kickingL', true);
        }
    }
}