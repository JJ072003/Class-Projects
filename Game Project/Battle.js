



function Start()
{

}




class Stats
{
    constructor(strength, defence, agility, intelligence, mana, vitality)
    {
        this.strength = strength
        this.defence = defence
        this.agility = agility
        this.intelligence = intelligence
        this.mana = mana
        this.vitality = vitality
    }
}


//=========================================================================

//              ENTITIES

//=========================================================================





class DefaultEntity
{
    attack()
    {

    }

    getDamage()
    {

    }

    onHit()
    {

    }
}


class Player extends DefaultEntity
{
    constructor(myClass)
    {
        this.myClass = myClass
        this.bag = []
        this.addToBag()
    }

    equiptItem()
    {

    }

    static onDeath()
    {

    }
}


class DefaultEnemy extends DefaultEntity
{

}


// -----------------------
// Entity RPG Classes
// -----------------------


class EntityClass
{
    constructor(stats, skills, weaponTypes, startingGear)
    {
        this.stats = stats
        this.skills = skills
        this.weaponTypes = weaponTypes
        this.startingGear = startingGear
    }
}


class WarriorClass extends EntityClass
{
    
    constructor()
    {
        super(new Stats(20, 12, 10, 8, 5, 13), null, null, [new Weapon(), new Armor()])
        
    }
}





//=========================================================================

//              EQUIPTABLES

//=========================================================================



//------------------------------------
//      EQUPTABLES STATS
//------------------------------------


class EquiptableStats
{
    constructor(armor, attack, damageType, skills, size)
    {

    }
}

class ToolStats
{

}


//----------------------------------
//      EQUIPTABLE ITEMS
//----------------------------------


class Equiptable
{
    constructor(name)
    {
        this.name = name
    }
}


class Weapon extends Equiptable
{

}


class Armor extends Equiptable
{

}


class Tool extends Equiptable
{

}


class Bag
{
    constructor()
    {
        this.contents = []
    }

    addToBag(items)
    {
        for (const item of items) 
        {
            this.contents.push(item)
        }
    }

    removeFromBag()
    {

    }

    findInBag()
    {

    }
}


Start()