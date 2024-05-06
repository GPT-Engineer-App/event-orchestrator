import { Container, VStack, Text, Button, Input, useToast, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Added",
      description: "Your event has been added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Deleted",
      description: "Your event has been deleted successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const editEvent = (id) => {
    const event = events.find(event => event.id === id);
    setNewEvent({ name: event.name, description: event.description });
    deleteEvent(id);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" mb={4}>Event Management</Text>
        <Input placeholder="Event Name" name="name" value={newEvent.name} onChange={handleInputChange} />
        <Input placeholder="Event Description" name="description" value={newEvent.description} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={addEvent}>Add Event</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <IconButton icon={<FaEdit />} onClick={() => editEvent(event.id)} aria-label="Edit" />
                  <IconButton icon={<FaTrash />} onClick={() => deleteEvent(event.id)} aria-label="Delete" ml={2} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;