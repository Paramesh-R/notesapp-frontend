import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'

const NavbarComp = () => {
    const expand = "lg"

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar
                key={expand}
                expand={expand}
                variant='dark'
                bg="dark"
                data-bs-theme="dark"
                fixed="top"
                sticky="top"
                className={`bg-body-tertiary ${scrolled ? '' : /* 'bg-opacity-75' */''} fade show`}
            >
                <Container fluid>
                    <Navbar.Brand href="#">Notes<span className="text-danger">App</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        className="bg-secondary text-white"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/create" className='d-flex align-items-center'>
                                    <Icon icon="system-uicons:create" className='me-1' /> Create Note
                                </Nav.Link>

                                <Nav.Link onClick={() => { }}>Logout</Nav.Link>
                                {/* <NavDropdown
                                    title="Account"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    align={"end"}
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            {/* <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}


                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComp

//<div className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top bg-opacity-75">
//
//{/* Brand */}
//<div class="container-fluid">
//    <a class="navbar-brand" href="javascript(void)" className='fs-4 text-decoration-none'>
//        Oxygen <span className='text-success'>Planters</span>
//    </a>
//
//
//    {/* Search Box */}
//    <form class="d-flex">
//        <input class="form-control me-2 input-sm" type="search" placeholder="Search" aria-label="Search" />
//        <button class="btn btn-outline-success" type="submit">Search</button>
//    </form>
//</div>
//
//
//</div>